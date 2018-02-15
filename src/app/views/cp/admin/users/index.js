import {h, Component} from 'preact'
import {connect} from 'preact-redux'
import VirtualList from 'react-virtual-list'

import Icon from '../../../shared/icon'
import Modal from '../../../shared/modal'
import ViewLoading from '../../../shared/view-loading'
import User from './user'
import UsersToolbar from './users-toolbar'
import {getUsers, deleteUser} from 'serverAPI/admin-settings'
import {userSelect, userUnselect, userUnselectAll} from 'actions/admin-settings'
import {scrollBlockOn, scrollBlockOff} from 'preventScroll'

import style from './styles.scss'

import locale from 'locale'

const viewStrings = locale.cp.admin.users

const mapStateToProps = (state) => {
  const {isFetchingUsers, uData} = state.users
  const {allToggled, selectedUsers} = state.userSelect
  const {token, sessionData} = state.authentication

  return {
    token,
    isFetchingUsers,
    uData,
    allToggled,
    selectedUsers,
    sessionData
  }
}

export default connect(mapStateToProps)(class UsersPartial extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modals: {
        singleDeleteActive: false,
        multipleDeleteActive: false
      },
      isDeleting: false
    }

    this.toggleDeleteConfirmModal = this.toggleDeleteConfirmModal.bind(this)
    this.handleToggleUser = this.handleToggleUser.bind(this)
    this.confirmSingleDelete = this.confirmSingleDelete.bind(this)
    this.confirmMultipleDelete = this.confirmMultipleDelete.bind(this)
  }

  componentWillMount () {
    this.getUsers()
    const list = ({
      virtual,
      itemHeight
    }) => (
      <ul style={virtual.style} class='flex flex-dc'>
        {virtual.items.map((item) => (
          <User itemData={item}
            toggleDeleteConfirmModal={this.toggleDeleteConfirmModal}
            handleToggleUser={this.handleToggleUser} />
        ))}
      </ul>
    )

    this.usersVirtualList = VirtualList()(list)
  }

  async getUsers () {
    let users = this.props.dispatch(getUsers(this.props.token))
    return users
  }

  toggleIsDeleting () {
    this.setState({ isDeleting: !this.state.isDeleting })
  }

  renderUserList () {
    if (this.props.uData) {
      return (
        <this.usersVirtualList
          items={this.props.uData}
          itemHeight={55}
          itemBuffer={5}
        />
      )
    }
    return <p>{viewStrings.user_load_error}</p>
  }

  // Select
  handleToggleUser (event) {
    let id = event.currentTarget.dataset.id

    let selectedUsers = this.props.selectedUsers

    if (selectedUsers.includes(id)) {
      // Item is selected, unselect
      selectedUsers.splice(selectedUsers.indexOf(id), 1)
      this.props.dispatch(userUnselect(selectedUsers))
    } else {
      // Item isn't selected, select
      selectedUsers.push(id)
      // We subtract 1 to the total ammount because we don't manipulate the current user here
      this.props.dispatch(userSelect(selectedUsers, Number(this.props.uData.length) - 1 === Number(selectedUsers.length)))
    }
  }

  toggleDeleteConfirmModal () {
    if (!this.state.isDeleting && this.props.selectedUsers.length > 0) {
      let modals = {
        ...this.state.modals
      }

      modals.singleDeleteActive || modals.multipleDeleteActive ? scrollBlockOff() : scrollBlockOn()

      if (this.props.selectedUsers.length === 1) {
        // If we're not multiple-selecting or we're deleting just one item
        modals.singleDeleteActive = !modals.singleDeleteActive
      } else {
        modals.multipleDeleteActive = !modals.multipleDeleteActive
      }

      this.setState({ modals })
    }
  }

  confirmSingleDelete () {
    this.props.dispatch(deleteUser(this.props.selectedUsers[0], this.props.token)).then(() => {
      // Reset selected items list
      this.props.dispatch(userUnselectAll())
      // Refresh data
      this.getUsers()
      this.toggleDeleteConfirmModal()
    })
  }

  confirmMultipleDelete () {
    let selectedUsers = this.props.selectedUsers
    let deleteIndexCount = 0

    this.toggleIsDeleting()

    for (let userId of selectedUsers) {
      this.props.dispatch(deleteUser(userId, this.props.token)).then(() => {
        deleteIndexCount++

        if (deleteIndexCount === selectedUsers.length) {
          this.toggleIsDeleting()
          // Reset selected items list
          this.props.dispatch(userUnselectAll())
          // Refresh data
          this.getUsers()
          this.toggleDeleteConfirmModal()
        }
      })
    }
  }

  render ({isFetchingUsers, uData}) {
    return (
      <div class={style.section}>
        <div class='flex flex-cross-center'><h3 class='flex flex-full-center'><Icon iconName='account-multiple' />&nbsp;{viewStrings.title}</h3></div>
        <div class={style.usersTable}>
          <UsersToolbar handleDeleteClick={this.toggleDeleteConfirmModal} />
          <div class={`${style.userRow} ${style.userTableHeader}`}>
            <span class={`flex flex-cross-center ${style.userTableHeaderFieldId}`}>ID</span>
            <span class={`flex flex-cross-center`}>{viewStrings.table.title_name}</span>
            <span class={`flex flex-cross-center ${style.userTableHeaderFieldEmail}`}>{viewStrings.table.table_email}</span>
          </div>
          {isFetchingUsers && !uData
            ? <ViewLoading />
            : this.renderUserList()
          }
        </div>
        {/* Single Delete Modal */}
        <Modal
          isActive={this.state.modals.singleDeleteActive}
          modalTitle={viewStrings.action_modals.title}
          toggleModal={this.toggleDeleteConfirmModal}
          closeButtonText={viewStrings.action_modals.cancel}
          acceptButtonText={viewStrings.action_modals.accept}
          onAcceptExecute={this.confirmSingleDelete}>
          <p class='flex flex-full-center' >
            {viewStrings.action_modals.single_delete}
          </p>
        </Modal>
        {/* Multiple Delete Modal */}
        <Modal
          isActive={this.state.modals.multipleDeleteActive}
          modalTitle={viewStrings.action_modals.title}
          toggleModal={this.toggleDeleteConfirmModal}
          closeButtonText={viewStrings.action_modals.cancel}
          acceptButtonText={viewStrings.action_modals.accept}
          onAcceptExecute={this.confirmMultipleDelete}
          disabled={this.state.isDeleting}>
          <p class='flex flex-full-center'>
            {this.props.selectedUsers.length} {viewStrings.action_modals.multiple_delete}
          </p>
        </Modal>
      </div>
    )
  }
})
