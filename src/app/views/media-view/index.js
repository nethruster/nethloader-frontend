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
  constructor (props) {
    super(props)

    this.metas = {}

    this.computeMeta = this.renderMeta.bind(this)
  }

  componentWillMount () {
    window.scrollTo(0, 0) // Quick hack to fix react-routing scroll issue
    this.props.dispatch(getMediaInfo(this.context.router.route.match.params.id)).then((data) => {
      this.mediaSrc = `${baseMediaPath}${data.id}.${data.extension}`
      this.mediaUrl = `${document.location.origin}/${data.id}`
    }).then(() => {
      this.renderMeta()
    }).catch(() => {
      this.context.router.history.push('/404')
    })
  }

  componentWillUnmount () {
    if (this.metas) {
      Object.values(this.metas).forEach(element => element.remove())
    }
  }

  renderMeta () {
    this.metas.twitterTitle = document.createElement('meta')
    this.metas.twitterTitle.name = 'twitter:title'
    this.metas.twitterTitle.content = 'Nethloader: Media sharing service'

    this.metas.twitterSite = document.createElement('meta')
    this.metas.twitterSite.name = 'twitter:site'
    this.metas.twitterSite.content = '@nethruster'

    this.metas.twitterDesc = document.createElement('meta')
    this.metas.twitterDesc.name = 'twitter:description'
    this.metas.twitterDesc.content = 'Nethloader, a self hosted media sharing service'

    this.metas.twitterImg = document.createElement('meta')
    this.metas.twitterImg.name = 'twitter:image'
    this.metas.twitterImg.content = this.mediaSrc

    this.metas.ogSiteName = document.createElement('meta')
    this.metas.ogSiteName.name = 'og:site_name'
    this.metas.ogSiteName.content = 'Nethloader'

    this.metas.ogTitle = document.createElement('meta')
    this.metas.ogTitle.name = 'og:title'
    this.metas.ogTitle.content = 'Nethloader: Media sharing service'
    
    this.metas.ogImage = document.createElement('meta')
    this.metas.ogImage.name = 'og:image'
    this.metas.ogImage.content = this.mediaSrc

    this.metas.ogDesc = document.createElement('meta')
    this.metas.ogDesc.name = 'og:description'
    this.metas.ogDesc.content = 'Nethloader, a self hosted media sharing service'

    this.metas.ogType = document.createElement('meta')
    this.metas.ogType.name = 'og:type'
    this.metas.ogType.content = 'website'

    Object.values(this.metas).forEach(element => { document.head.appendChild(element) })
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
                <MediaInfo createdAt={mediaInfo.createdAt} />
              </div>
            )
            : <ViewLoading />
        }
      </div>
    )
  }
})
