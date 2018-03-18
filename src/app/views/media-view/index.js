import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import MediaItem from './media-item'
import MediaInfo from './media-info'
import ViewLoading from '../shared/view-loading'
import NotFound from '../shared/not-found'
import {baseMediaPath} from 'app.config'
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
        id: '',
        extension: '',
        found: true
      }
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
        this.mediaSrc = `${baseMediaPath}${data.id}.${data.extension}`
        this.mediaUrl = `${document.location.origin}/${data.id}`
      }).catch(() => {
        let mediaData = this.state.mediaData
        mediaData.found = false
        this.setState({mediaData})
      })
    }
  }

  render ({mediaInfo, isFetching}) {
    return (
      <div class={`${style.mediaView} flex flex-full-center`}>
        {
          this.state.mediaData.found ? (!isFetching && mediaInfo
            ? (
              <div class={`${style.mediaViewWrapper} flex flex-dc flex-full-center`}>
                <MediaItem
                  mediaSrc={this.mediaSrc}
                  type={mediaInfo.extension}
                  id={mediaInfo.id} />
                <MediaInfo createdAt={mediaInfo.createdAt} />
              </div>
            )
            : <ViewLoading />) : <NotFound />
        }
      </div>
    )
  }
})
