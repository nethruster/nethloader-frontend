import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import Button from '../../../../../../../shared/button'
import {userSelectAll, userUnselectAll} from 'actions/admin-settings'

import './styles.scss'

const mapStateToProps = (state) => {
  const {sessionData} = state.authentication
  const {isFetchingUsers, uData} = state.users
  const {allToggled, selectedUsers} = state.userSelect

  return {
    isFetchingUsers,
    uData,
    allToggled,
    selectedUsers,
    sessionData
  }
}

export default connect(mapStateToProps)(class SelectUserControls extends Component {
  constructor (props) {
    super(props)

    this.handleToggleAllUsers = this.handleToggleAllUsers.bind(this)
  }

  handleToggleAllUsers () {
    // Add all images available to selectedUsers
    let selectedUsers = this.props.uData.filter(user => { return !user.isAdmin || this.props.sessionData.id !== user.id }).map(el => el.id)

    if (this.props.allToggled) {
      this.props.dispatch(userUnselectAll())
    } else {
      this.props.dispatch(userSelectAll(selectedUsers))
    }
  }

  render ({handleDeleteClick}) {
    return (
      <div class={`flex flex-cross-center flex-sb`}>
        <Button
          iconButton
          icon='selectall'
          onClickExecute={this.handleToggleAllUsers}
        />
        <Button
          iconButton
          icon='delete'
          onClickExecute={handleDeleteClick}
          iconColor='#e53935'
        />
      </div>
    )
  }
})
