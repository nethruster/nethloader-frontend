import { h, Component } from 'preact'
import {connect} from 'preact-redux'

import Button from '../../../../shared/button'
import Pagination from './pagination'
import ViewLoading from '../../../../shared/view-loading'
import SelectControls from './select-controls'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {userMedia, isFetchingMedia, mediaLimit} = state.userMedia

  return {
    userMedia,
    isFetchingMedia,
    mediaLimit
  }
}

export default connect(mapStateToProps)(class UploadsToolbar extends Component {
  render ({isSelecting, toggleIsSelecting, handleDeleteClick, isFetchingMedia, userMedia, updateUserMedia, mediaLimit}) {
    return (
      <div class={`flex flex-dc ${style.uploadsToolbar} ${!isFetchingMedia && userMedia.images.length === 0 ? 'dom-hidden' : ''}`}>
        <div class={`flex flex-cross-center flex-sb ${style.uploadsToolbarSelect}`}>
          <div class='flex flex-full-center'>
            <Button iconButton icon='filter' />
          </div>
          <SelectControls isSelecting={isSelecting} toggleIsSelecting={toggleIsSelecting} handleDeleteClick={handleDeleteClick} />
        </div>
        {!isFetchingMedia && (userMedia.totalCount > mediaLimit) ? <Pagination updateUserMedia={updateUserMedia} /> : <ViewLoading />}
      </div>
    )
  }
})
