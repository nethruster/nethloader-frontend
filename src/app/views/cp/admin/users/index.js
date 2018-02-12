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
    return <p>Couldn't load users :(. Check the console.</p>
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
      this.props.dispatch(userSelect(selectedUsers, Number(this.props.uData.length) === Number(selectedUsers.length)))
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
        <div class='flex flex-cross-center'><h3 class='flex flex-full-center'><Icon iconName='account-multiple' />&nbsp;Users</h3></div>
        <div class={style.usersTable}>
          <UsersToolbar handleDeleteClick={this.toggleDeleteConfirmModal} />
          <div class={`${style.userRow} ${style.userTableHeader}`}>
            <span class={`flex flex-cross-center ${style.userTableHeaderFieldId}`}>ID</span>
            <span class={`flex flex-cross-center`}>Name</span>
            <span class={`flex flex-cross-center ${style.userTableHeaderFieldEmail}`}>Email</span>
          </div>
          {isFetchingUsers && !uData
            ? <ViewLoading />
            : this.renderUserList()
          }
        </div>
        {/* Single Delete Modal */}
        <Modal
          isActive={this.state.modals.singleDeleteActive}
          modalTitle='Delete user'
          toggleModal={this.toggleDeleteConfirmModal}
          closeButtonText='Wait, no'
          acceptButtonText='Yes, do it'
          onAcceptExecute={this.confirmSingleDelete}>
          <p class='flex flex-full-center'>Are you sure that you want to delete the selected user?</p>
        </Modal>
        {/* Multiple Delete Modal */}
        <Modal
          isActive={this.state.modals.multipleDeleteActive}
          modalTitle='Delete users'
          toggleModal={this.toggleDeleteConfirmModal}
          closeButtonText='Wait, no'
          acceptButtonText='Yes, do it'
          onAcceptExecute={this.confirmMultipleDelete}
          disabled={this.state.isDeleting}>
          <p class='flex flex-full-center'>
            {this.props.selectedUsers.length} users are about to be deleted, are you sure that you want to proceed?
          </p>
        </Modal>
      </div>
    )
  }
})
