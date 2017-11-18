import { h, Component } from 'preact'
import {connect} from 'preact-redux'

import Button from '../../../../shared/button'
import Pagination from './pagination'
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
  render ({toggleIsSelecting, handleDeleteClick, isFetchingMedia, userMedia, updateUserMedia, mediaLimit}) {
    return (
      <div class={`flex flex-dc ${style.uploadsToolbar}`}>
        <div class={`flex flex-cross-center flex-sb ${style.uploadsToolbarSelect}`}>
          <div class='flex flex-full-center'>
            <Button iconButton icon='filter' />
          </div>
          <SelectControls handleDeleteClick={handleDeleteClick} />
        </div>
        {userMedia && userMedia.totalCount > mediaLimit ? <Pagination updateUserMedia={updateUserMedia} /> : null}
      </div>
    )
  }
})
