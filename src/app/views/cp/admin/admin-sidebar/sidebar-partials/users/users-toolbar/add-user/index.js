import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import Button from '../../../../../../../shared/button'
import CreateUserModal from './add-user-modal'

const mapStateToProps = (state) => {
  const {isFetchingUsers, uData} = state.users
  const {allToggled, selectedUsers} = state.userSelect

  return {
    isFetchingUsers,
    uData,
    allToggled,
    selectedUsers
  }
}

export default connect(mapStateToProps)(class AddUser extends Component {
  constructor (props) {
    super(props)

    this.state = { addUserModal: false }

    this.toggleAddUserModal = this.toggleAddUserModal.bind(this)
  }

  toggleAddUserModal () {
    this.setState({ addUserModal: !this.state.addUserModal })
  }

  render () {
    return (
      <div class={`flex flex-cross-center flex-sb`}>
        <Button iconButton icon='add-user' onClickExecute={this.toggleAddUserModal} />
        <CreateUserModal isActive={this.state.addUserModal} toggleModal={this.toggleAddUserModal} />
      </div>
    )
  }
})
