import {h, Component} from 'preact'

import Button from '../../../../../shared/button'
import CreateUserModal from './add-user-modal'
import {scrollBlockOn, scrollBlockOff} from 'preventScroll'

export default class AddUser extends Component {
  constructor (props) {
    super(props)

    this.state = { addUserModal: false }

    this.toggleAddUserModal = this.toggleAddUserModal.bind(this)
  }

  toggleAddUserModal () {
    this.setState({ addUserModal: !this.state.addUserModal })
    this.state.addUserModal ? scrollBlockOn() : scrollBlockOff()
  }

  render () {
    return (
      <div class={`flex flex-cross-center flex-sb`}>
        <Button iconButton icon='add-user' onClickExecute={this.toggleAddUserModal} />
        <CreateUserModal isActive={this.state.addUserModal} toggleModal={this.toggleAddUserModal} />
      </div>
    )
  }
}
