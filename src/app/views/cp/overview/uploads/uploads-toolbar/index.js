import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import Filters from './filters'
import Pagination from './pagination'
import SelectControls from './select-controls'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {userMedia, isFetchingMedia, params} = state.userMedia

  return {
    userMedia,
    isFetchingMedia,
    params
  }
}

export default connect(mapStateToProps)(class UploadsToolbar extends Component {
  render ({toggleIsSelecting, handleDeleteClick, isFetchingMedia, userMedia, updateUserMedia, params}) {
    return (
      <div class={`flex flex-dc ${style.uploadsToolbar}`}>
        <div class={`flex flex-cross-center flex-sb ${style.uploadsToolbarSelect}`}>
          <Filters updateUserMedia={updateUserMedia} />
          <SelectControls handleDeleteClick={handleDeleteClick} />
        </div>
        {userMedia && userMedia.totalCount > params.mediaLimit ? <Pagination /> : null}
      </div>
    )
  }
})
