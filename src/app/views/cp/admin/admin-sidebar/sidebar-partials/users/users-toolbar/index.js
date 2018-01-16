import {h} from 'preact'
import {connect} from 'preact-redux'

import Filters from './filters'
import SelectUserControls from './select-controls'
import AddUser from './add-user'

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
    <div class={`flex flex-dc ${style.usersToolbar}`}>
      <div class={`flex flex-cross-center ${style.usersToolbarSelect}`}>
        {/* <Filters /> */}
        <div class='flex flex-full-center'>
          <AddUser />
          <SelectUserControls handleDeleteClick={handleDeleteClick} />
        </div>
      </div>
    </div>
  )
})
