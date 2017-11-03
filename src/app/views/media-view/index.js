import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import MediaItem from './media-item'
import MediaInfo from './media-info'
import ViewLoading from '../shared/view-loading'

import { baseMediaPath } from 'app.config'
import { getMediaInfo } from 'serverAPI/media'

import style from './styles.scss'

function mapStateToProps (state) {
  const {mediaInfo} = state.mediaInfo

  return {mediaInfo}
}

export default connect(mapStateToProps)(class MediaView extends Component {
  constructor (props) {
    super(props)

    this.state = {mediaSrc: ''}
  }

  componentWillMount () {
    this.props.dispatch(getMediaInfo(this.context.router.route.match.params.id)).then(() => {
      let state = {
        ...this.state
      }

      state.mediaSrc = `${baseMediaPath}${this.props.mediaInfo.id}.${this.props.mediaInfo.extension}`

      this.setState(state)
    })
  }

  render ({mediaInfo, mediaSrc}) {
    return (
      <div class={`${style.mediaView} flex flex-full-center`}>
        {mediaSrc ? <div class={`${style.mediaViewWrapper} flex flex-dc flex-full-center`}>
          <MediaItem mediaSrc={mediaSrc} type={mediaInfo.extension} id={mediaInfo.id} />
          <MediaInfo mediaSrc={mediaSrc} data={mediaInfo} />
        </div> : <ViewLoading />}
      </div>
    )
  }
})
