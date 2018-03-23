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

    this.metaScript = document.getElementById('meta-script')
  }

  componentWillMount () {
    window.scrollTo(0, 0) // Quick hack to fix react-routing scroll issue
    
    let routeId = this.context.router.route.match.params.id
    let metaScript = document.getElementById('meta-script')
    
    if (metaScript && ssrData.id === routeId) { // eslint-disable-line no-undef
      this.setState({mediaData: ssrData}) // eslint-disable-line no-undef
    } else {
      this.props.dispatch(getMediaInfo(routeId)).then((data) => {
        this.mediaSrc = `${baseMediaPath}${data.user.id}/${data.id}.${data.extension}` // eslint-disable-line no-undef
        this.mediaUrl = `${document.location.origin}/${data.id}`

        let mediaData = this.state.mediaData
        mediaData.id = data.id
        mediaData.extension = data.extension
        mediaData.createdAt = data.createdAt
        mediaData.userId = data.user.id

        this.setState({mediaData})
      }).catch((err) => {
        console.error(err)
        let mediaData = this.state.mediaData
        mediaData.found = false
        this.setState({mediaData})
      })
    }
  }

  componentWillUnmount () {
    try {
      if (this.metaScript) {
        this.metaScript.remove() // Free the data to give way to new async data
        this.setState({ mediaData: this.defaultState })
      }
    } catch (err) {
      console.error(err)
    }
  }

  render ({isFetching}) {
    return (
      <div class={`${style.mediaView} flex flex-full-center`}>
        {
          this.state.mediaData.found
            ? (
              (!isFetching && this.state.mediaData.userId) || this.metaScript
                ? (
                  <div class={`${style.mediaViewWrapper} flex flex-dc flex-full-center`}>
                    <MediaItem
                      mediaSrc={this.mediaSrc}
                      type={this.state.mediaData.extension}
                      id={this.state.mediaData.id} />
                    <MediaInfo mediaData={this.state.mediaData} />
                  </div>
                ) : <ViewLoading />
            ) : <NotFound />
        }
      </div>
    )
  }
})
