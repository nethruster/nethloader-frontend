import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import Button from '../../../../../../../shared/button'
import DropDownMenu from '../../../../../../../shared/dropdown-menu'
import Modal from '../../../../../../../shared/modal'
import EditUserModal from './edit-user-modal'
import {userUnselectAll} from 'actions/admin-settings'
import {deleteAllUserImages} from 'serverAPI/settings'
import {copyToClipboard} from 'utils'

import style from '../styles.scss'

const mapStateToProps = (state) => {
  const {selectedUsers} = state.userSelect
  const {sessionData, token} = state.authentication

  return {
    selectedUsers,
    sessionData,
    token
  }
}

export default connect(mapStateToProps)(class UserButtons extends Component {
  constructor (props) {
    super(props)

    this.state = {
      apiKeyCopied: false,
      isToggleEditUserModalActive: false,
      isDeleteAllMediaModalActive: false
    }

    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.toggleEditUserModal = this.toggleEditUserModal.bind(this)
    this.handleCopyClick = this.handleCopyClick.bind(this)
    this.toggleDeleteUserMedia = this.toggleDeleteUserMedia.bind(this)
    this.handleDeleteUserMediaSubmit = this.handleDeleteUserMediaSubmit.bind(this)
  }

  async handleDeleteClick (event) {
    await this.props.dispatch(userUnselectAll())
    this.props.handleToggleUser(event)
    this.props.toggleDeleteConfirmModal()
  }

  toggleEditUserModal () {
    this.setState({isToggleEditUserModalActive: !this.state.isToggleEditUserModalActive})
  }

  handleCopyClick (event) {
    copyToClipboard(event)

    let apiKeyCopied = this.state.apiKeyCopied

    apiKeyCopied = true
    this.setState({ apiKeyCopied })

    setTimeout(() => {
      apiKeyCopied = false
      this.setState({ apiKeyCopied })
    }, 1500)
  }

  toggleDeleteUserMedia () {
    this.setState({ isDeleteAllMediaModalActive: !this.state.isDeleteAllMediaModalActive })
  }

  handleDeleteUserMediaSubmit () {
    this.props.dispatch(deleteAllUserImages(this.props.itemData.id, this.props.token)).then(() => {
      this.toggleDeleteUserMedia()
    })
  }

  render ({itemData, selectedUsers, handleToggleUser, toggleDeleteConfirmModal}) {
    return (
      <span class={`flex flex-full-center ${style.userRowField} ${style.userRowFieldIcon} ${style.userRowFieldIconInteractive}`}>
        <div class={`flex flex-full-center`}>
          <DropDownMenu>
            <li>
              <a href>
                <Button
                  text='View Media'
                  icon='file-image'
                  dropdown
                />
              </a>
            </li>
            <li>
              <Button
                icon='copy'
                text={this.state.apiKeyCopied ? 'Copied!' : 'Copy APIkey'}
                copyText={itemData.apiKey}
                onClickExecute={this.handleCopyClick}
                dropdown
              />
            </li>
            <li>
              <Button
                icon='edit'
                text='User settings'
                onClickExecute={this.toggleEditUserModal}
                dropdown
              />
            </li>
            <li>
              <Button
                icon='delete-sweep'
                text='Delete media'
                onClickExecute={this.toggleDeleteUserMedia}
                dropdown
              />
            </li>
            <li>
              <Button
                dataId={itemData.id}
                text='Delete user'
                icon='delete'
                dropdown
                onClickExecute={this.handleDeleteClick}
              />
            </li>
          </DropDownMenu>
        </div>
        <EditUserModal isActive={this.state.isToggleEditUserModalActive} toggleModal={this.toggleEditUserModal} data={itemData} />
        <Modal
          isActive={this.state.isDeleteAllMediaModalActive}
          modalTitle='Delete media'
          toggleModal={this.toggleDeleteUserMedia}
          closeButtonText='Wait, no'
          acceptButtonText='I know, proceed'
          onAcceptExecute={this.handleDeleteUserMediaSubmit}>
          <p class='flex flex-full-center'>This will delete ALL media uploaded by this user.</p>
          <p class='flex flex-full-center danger-text'>IT CANNOT BE UNDONE.</p>
        </Modal>
      </span>
    )
  }
})
