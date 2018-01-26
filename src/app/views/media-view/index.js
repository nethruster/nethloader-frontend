import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import MediaItem from './media-item'
import MediaInfo from './media-info'
import ViewLoading from '../shared/view-loading'
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
  componentWillMount () {
    window.scrollTo(0, 0) // Quick hack to fix react-routing scroll issue
    this.props.dispatch(getMediaInfo(this.context.router.route.match.params.id)).then((data) => {
      this.mediaSrc = `${baseMediaPath}${data.id}.${data.extension}`
      this.mediaUrl = `${document.location.origin}/${data.id}`
    }).catch(() => {
      this.context.router.history.push('/404')
    })
  }

  render ({mediaInfo, isFetching}) {
    return (
      <div class={`${style.mediaView} flex flex-full-center`}>
        {
          !isFetching && mediaInfo
            ? (
              <div class={`${style.mediaViewWrapper} flex flex-dc flex-full-center`}>
                <MediaItem
                  mediaSrc={this.mediaSrc}
                  type={mediaInfo.extension}
                  id={mediaInfo.id} />
                <MediaInfo
                  mediaSrc={this.mediaSrc}
                  mediaUrl={this.mediaUrl}
                  createdAt={mediaInfo.createdAt} />
              </div>
            )
            : <ViewLoading />
        }
      </div>
    )
  }
})
