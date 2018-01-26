import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import SettingsSection from '../../../shared/settings-section'
import UsernameModal from './modals/username'
import EmailModal from './modals/email'
import PasswordModal from './modals/password'
import ApiKeyModal from './modals/apikey'
import DeleteAllMediaModal from './modals/delete-all-media'
import DeleteUserAccountModal from './modals/delete-user-account.js'
import {toggleDarkMode} from 'utils'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {userData} = state.userData
  const {totalCount} = state.userMedia

  return {
    userData,
    totalCount
  }
}

export default connect(mapStateToProps)(class SettingsGrid extends Component {
  constructor (props) {
    super(props)

    this.state = {
      usernameModal: false,
      emailModal: false,
      passwordModal: false,
      apikeyModal: false,
      deleteAllUserMediaModal: false,
      deleteUserAccountModal: false
    }

    this.toggleUsernameModal = this.toggleUsernameModal.bind(this)
    this.toggleEmailModal = this.toggleEmailModal.bind(this)
    this.togglePasswordModal = this.togglePasswordModal.bind(this)
    this.toggleApikeyModal = this.toggleApikeyModal.bind(this)
    this.toggleDeleteAllMediaModal = this.toggleDeleteAllMediaModal.bind(this)
    this.toggleDeleteUserAccountModal = this.toggleDeleteUserAccountModal.bind(this)
  }

  toggleUsernameModal () {
    this.setState({ usernameModal: !this.state.usernameModal })
  }

  toggleEmailModal () {
    this.setState({ emailModal: !this.state.emailModal })
  }

  togglePasswordModal () {
    this.setState({ passwordModal: !this.state.passwordModal })
  }

  toggleApikeyModal () {
    this.setState({ apikeyModal: !this.state.apikeyModal })
  }

  toggleDeleteAllMediaModal () {
    this.setState({ deleteAllUserMediaModal: !this.state.deleteAllUserMediaModal })
  }

  toggleDeleteUserAccountModal () {
    this.setState({ deleteUserAccountModal: !this.state.deleteUserAccountModal })
  }

  render ({userData, totalCount}) {
    return (
      <div class={style.gridContainer}>
        <SettingsSection
          icon='user'
          title='Change username'
          currentText='Current username'
          currentData={userData.name}
          onClickExecute={this.toggleUsernameModal}
        />
        <UsernameModal isActive={this.state.usernameModal} toggleModal={this.toggleUsernameModal} />

        <SettingsSection
          icon='password'
          title='Change password'
          currentData="That's your secret, we'd put it here if we knew."
          onClickExecute={this.togglePasswordModal}
        />
        <PasswordModal isActive={this.state.passwordModal} toggleModal={this.togglePasswordModal} />

        <SettingsSection
          icon='email'
          title='Change email'
          currentText='Current email'
          currentData={userData.email}
          onClickExecute={this.toggleEmailModal}
        />
        <EmailModal isActive={this.state.emailModal} toggleModal={this.toggleEmailModal} />

        <SettingsSection
          icon='auto-upload'
          title='Regenerate APIkey'
          currentData='Generate a new APIKey. This will replace your current one.'
          onClickExecute={this.toggleApikeyModal}
        />
        <ApiKeyModal isActive={this.state.apikeyModal} toggleModal={this.toggleApikeyModal} />

        <SettingsSection
          icon='delete-sweep'
          danger
          title='Delete all media'
          currentData={`Delete all your images and videos. (${totalCount} items)`}
          onClickExecute={this.toggleDeleteAllMediaModal}
          disabled={totalCount <= 0}
        />
        <DeleteAllMediaModal isActive={this.state.deleteAllUserMediaModal} toggleModal={this.toggleDeleteAllMediaModal} />

        <SettingsSection
          icon='account-remove'
          danger
          title='Remove account'
          currentData={`Delete this account and all its media. (Forever!)`}
          onClickExecute={this.toggleDeleteUserAccountModal}
        />
        <DeleteUserAccountModal isActive={this.state.deleteUserAccountModal} toggleModal={this.toggleDeleteUserAccountModal} />

        <SettingsSection
          icon='dark-light'
          title='Toggle dark mode'
          currentData={`Activate a dark mode if you're a night owl or restore the glorious white.`}
          onClickExecute={toggleDarkMode}
        />
      </div>
    )
  }
})
