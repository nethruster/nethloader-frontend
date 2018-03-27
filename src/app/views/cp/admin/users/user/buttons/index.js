import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { scrollBlockOn, scrollBlockOff } from 'preventScroll'
import { showSnack } from 'react-redux-snackbar'

import Button from '../../../../../shared/button'
import DropDownMenu from '../../../../../shared/dropdown-menu'
import Modal from '../../../../../shared/modal'
import EditUserModal from './edit-user-modal'
import { userUnselectAll } from 'actions/admin-settings'
import { deleteAllUserImages } from 'serverAPI/settings'
import { copyToClipboard } from 'utils'

import style from '../styles.scss'

const viewStrings = locale.cp.admin.users.user.buttons // eslint-disable-line no-undef

const mapStateToProps = (state) => {
  const { selectedUsers } = state.userSelect
  const { sessionData, token } = state.authentication

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
    this.state.isToggleEditUserModalActive ? scrollBlockOn() : scrollBlockOff()
    this.setState({ isToggleEditUserModalActive: !this.state.isToggleEditUserModalActive })
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
    this.state.isDeleteAllMediaModalActive ? scrollBlockOn() : scrollBlockOff()
    this.setState({ isDeleteAllMediaModalActive: !this.state.isDeleteAllMediaModalActive })
  }

  handleDeleteUserMediaSubmit () {
    this.props.dispatch(deleteAllUserImages(this.props.itemData.id, this.props.token)).then(() => {
      this.toggleDeleteUserMedia()
      this.props.dispatch(showSnack('adminAllUserMediaDeleted', {
        label: viewStrings.toast.successLabel,
        timeout: 3000,
        button: { label: viewStrings.toast.toast_ok }
      }))
    }).catch(err => {
      this.props.dispatch(showSnack('adminAllUserMediaDeletedError', {
        label: err,
        timeout: 3000,
        button: { label: viewStrings.toast.toast_oktoast_ok }
      }))
    })
  }

  render ({ itemData, selectedUsers, handleToggleUser, toggleDeleteConfirmModal }) {
    return (
      <span class={`flex flex-full-center ${style.userRowField} ${style.userRowFieldIcon} ${style.userRowFieldIconInteractive}`}>
        <div class={`flex flex-full-center`}>
          <DropDownMenu id={itemData.id}>
            <li>
              <Button
                icon='copy'
                text={this.state.apiKeyCopied ? viewStrings.apikey_copied : viewStrings.copy_apikey}
                copyText={itemData.apiKey}
                onClickExecute={this.handleCopyClick}
                dropdown
              />
            </li>
            <li>
              <Button
                icon='edit'
                text={viewStrings.edit_user}
                onClickExecute={this.toggleEditUserModal}
                dropdown
              />
            </li>
            <li>
              <Button
                icon='delete-sweep'
                text={viewStrings.delete_user_media}
                onClickExecute={this.toggleDeleteUserMedia}
                dropdown
              />
            </li>
            <li>
              <Button
                dataId={itemData.id}
                text={viewStrings.delete_user}
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
          modalTitle={viewStrings.delete_user_media_modal.title}
          toggleModal={this.toggleDeleteUserMedia}
          closeButtonText={viewStrings.delete_user_media_modal.button_deny}
          acceptButtonText={viewStrings.delete_user_media_modal.button_accept}
          onAcceptExecute={this.handleDeleteUserMediaSubmit}>
          <p class='flex flex-full-center'>{viewStrings.delete_user_media_modal.text_info}</p>
          <p class='flex flex-full-center danger-text'>{viewStrings.delete_user_media_modal.text_warning}</p>
        </Modal>
      </span>
    )
  }
})
