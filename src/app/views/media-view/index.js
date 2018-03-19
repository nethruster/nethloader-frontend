import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import MediaItem from './media-item'
import MediaInfo from './media-info'
import ViewLoading from '../shared/view-loading'
import NotFound from '../shared/not-found'
import {getMediaInfo} from 'serverAPI/media'

import style from './styles.scss'

function mapStateToProps (state) {
  const {mediaInfo, isFetching} = state.mediaInfo

  return {
    mediaInfo,
    isFetching
  }
}

export default connect(mapStateToProps)(class MediaView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mediaData: {
        id: null,
        extension: null,
        found: true,
        createdAt: null,
        userId: null
      }
    }

    this.defaultState = {
      id: null,
      extension: null,
      found: true,
      createdAt: null,
      userId: null
    }
  }

  componentWillMount () {
    window.scrollTo(0, 0) // Quick hack to fix react-routing scroll issue
    try {
      if (ssrData) { // eslint-disable-line no-undef
        this.setState({mediaData: ssrData}) // eslint-disable-line no-undef
      }
    } catch (err) {
      this.props.dispatch(getMediaInfo(this.context.router.route.match.params.id)).then((data) => {
        this.mediaSrc = `${baseMediaPath}${data.id}.${data.extension}` // eslint-disable-line no-undef
        this.mediaUrl = `${document.location.origin}/${data.id}`

        let mediaData = this.state.mediaData
        mediaData.found = true
        mediaData.id = data.id
        mediaData.extension = data.extension
        mediaData.createdAt = data.createdAt

        this.setState({mediaData})
      }).catch(() => {
        let mediaData = this.state.mediaData
        mediaData.found = false
        this.setState({mediaData})
      })
    }
  }

  componentWillUnmount () {
    try { // eslint-disable-line no-undef
      ssrData = mediaData // eslint-disable-line no-undef
    } catch (err) {
      console.info(err)
    }
    
    this.setState(this.defaultState)
  }

  render ({mediaInfo, isFetching}) {
    return (
      <div class={`${style.mediaView} flex flex-full-center`}>
        {
          this.state.mediaData.found ? (!isFetching && (mediaInfo || this.state.mediaData.id)
            ? (
              <div class={`${style.mediaViewWrapper} flex flex-dc flex-full-center`}>
                <MediaItem
                  mediaSrc={this.mediaSrc}
                  type={this.state.mediaData.extension}
                  id={this.state.mediaData.id} />
                <MediaInfo mediaData={this.state.mediaData} />
              </div>
            )
            : <ViewLoading />) : <NotFound />
        }
      </div>
    )
  }
})
