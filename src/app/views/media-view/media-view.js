import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import MediaItem from './media-item/media-item.js'
import MediaInfo from './media-info/media-info.js'
import ViewLoading from '../shared/view-loading/view-loading'

import { mediaPath } from 'app.config'
import { getMediaInfo } from 'serverAPI/media'

import style from './media-view.scss'

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

      state.mediaSrc = `${mediaPath}${this.props.mediaInfo.id}.${this.props.mediaInfo.extension}`

      this.setState(state)
    })
  }

  render ({mediaInfo}) {
    return (
      <div class={`${style.mediaView} flex flex-full-center`}>
        {this.state.mediaSrc ? <div class={`${style.mediaViewWrapper} flex flex-dc flex-full-center`}>
          <MediaItem mediaSrc={this.state.mediaSrc} />
          <MediaInfo mediaSrc={this.state.mediaSrc} data={this.props.mediaInfo} />
        </div> : <ViewLoading />}
      </div>
    )
  }
})
