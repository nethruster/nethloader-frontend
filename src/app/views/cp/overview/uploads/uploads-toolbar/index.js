import { h, Component } from 'preact'
import {connect} from 'preact-redux'

import Button from '../../../../shared/button'
import UploadsPagination from './pagination/'
import { mediaSelectAll, mediaUnselectAll } from 'actions/media'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {userMedia, isFetchingMedia} = state.userMedia
  const { allToggled } = state.mediaSelect

  return {
    userMedia,
    isFetchingMedia,
    allToggled
  }
}

export default connect(mapStateToProps)(class UploadsToolbar extends Component {
  constructor (props) {
    super(props)

    this.handleToggleAllMedia = this.handleToggleAllMedia.bind(this)
  }

  handleToggleAllMedia () {
    // Add all images available to selectedMedia
    let selectedMedia = this.props.userMedia.images.map(el => el.id)

    if (this.props.allToggled) {
      this.props.dispatch(mediaUnselectAll())
    } else {
      this.props.dispatch(mediaSelectAll(selectedMedia))
    }
  }

  render ({isSelecting, toggleIsSelecting, handleDeleteClick, isFetchingMedia, userMedia, updateUserMedia}) {
    return (
      <div class={`flex flex-dc ${style.uploadsToolbar} ${!isFetchingMedia && userMedia.images.length === 0 ? 'dom-hidden' : ''}`}>
        <div class={`flex flex-cross-center flex-sb ${style.uploadsToolbarSelect}`}>
          <div class='flex flex-full-center'>
            <Button iconButton icon='filter' />
          </div>
          <div class='flex flex-cross-center flex-sb'>
            <Button iconButton icon={isSelecting ? 'select-off' : 'select-on'} onClickExecute={toggleIsSelecting} />
            <div class={`flex flex-cross-center flex-sb ${style.uploadsToolbarSelectButtons} ${isSelecting ? style.uploadsToolbarSelectButtonsActive : ''}`}>
              <Button iconButton icon='selectall' onClickExecute={this.handleToggleAllMedia} />
              <Button iconButton icon='delete' onClickExecute={handleDeleteClick} iconColor='#e53935' />
            </div>
          </div>
        </div>
        <UploadsPagination updateUserMedia={updateUserMedia} />
      </div>
    )
  }
})
