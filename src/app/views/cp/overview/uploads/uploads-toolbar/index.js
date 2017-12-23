import {h} from 'preact'
import {connect} from 'preact-redux'

import Filters from './filters'
import Pagination from './pagination'
import SelectControls from './select-controls'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {userMedia, params} = state.userMedia

  return {
    userMedia,
    params
  }
}

export default connect(mapStateToProps)(({handleDeleteClick, userMedia, updateUserMedia, params}) => {
  return (
    <div class={`flex flex-dc ${style.uploadsToolbar}`}>
      <div class={`flex flex-cross-center flex-sb ${style.uploadsToolbarSelect}`}>
        <Filters updateUserMedia={updateUserMedia} />
        <SelectControls handleDeleteClick={handleDeleteClick} />
      </div>
      {
        userMedia && userMedia.totalCount > params.mediaLimit
          ? <Pagination />
          : null
      }
    </div>
  )
})
