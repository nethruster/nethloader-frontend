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
import {scrollBlockOn, scrollBlockOff} from 'preventScroll'

import style from './styles.scss'

const viewStrings = locale.cp.settings.settings_grid.sections // eslint-disable-line no-undef

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
      deleteUserAccountModal: false,
      extraOptions: false
    }

    this.toggleUsernameModal = this.toggleUsernameModal.bind(this)
    this.toggleEmailModal = this.toggleEmailModal.bind(this)
    this.togglePasswordModal = this.togglePasswordModal.bind(this)
    this.toggleApikeyModal = this.toggleApikeyModal.bind(this)
    this.toggleDeleteAllMediaModal = this.toggleDeleteAllMediaModal.bind(this)
    this.toggleDeleteUserAccountModal = this.toggleDeleteUserAccountModal.bind(this)
    this.toggleExtraOptions = this.toggleExtraOptions.bind(this)
  }

  toggleUsernameModal () {
    this.state.usernameModal ? scrollBlockOff() : scrollBlockOn()
    this.setState({ usernameModal: !this.state.usernameModal })
  }

  toggleEmailModal () {
    this.state.emailModal ? scrollBlockOff() : scrollBlockOn()
    this.setState({ emailModal: !this.state.emailModal })
  }

  togglePasswordModal () {
    this.state.passwordModal ? scrollBlockOff() : scrollBlockOn()
    this.setState({ passwordModal: !this.state.passwordModal })
  }

  toggleApikeyModal () {
    this.state.apikeyModal ? scrollBlockOff() : scrollBlockOn()
    this.setState({ apikeyModal: !this.state.apikeyModal })
  }

  toggleDeleteAllMediaModal () {
    this.state.deleteAllUserMediaModal ? scrollBlockOff() : scrollBlockOn()
    this.setState({ deleteAllUserMediaModal: !this.state.deleteAllUserMediaModal })
  }

  toggleDeleteUserAccountModal () {
    this.state.deleteUserAccountModal ? scrollBlockOff() : scrollBlockOn()
    this.setState({ deleteUserAccountModal: !this.state.deleteUserAccountModal })
  }

  toggleExtraOptions () {
    this.setState({extraOptions: !this.state.extraOptions})
  }

  render ({userData, totalCount}) {
    return (
      <div class={style.gridContainer}>
        <SettingsSection
          icon='user'
          title={viewStrings.username.title}
          currentText={viewStrings.username.description}
          currentData={userData.name}
          onClickExecute={this.toggleUsernameModal}
        />
        <UsernameModal isActive={this.state.usernameModal} toggleModal={this.toggleUsernameModal} />

        <SettingsSection
          icon='password'
          title={viewStrings.password.title}
          currentData={viewStrings.password.description}
          onClickExecute={this.togglePasswordModal}
        />
        <PasswordModal isActive={this.state.passwordModal} toggleModal={this.togglePasswordModal} />

        <SettingsSection
          icon='email'
          title={viewStrings.email.title}
          currentText={viewStrings.email.description}
          currentData={userData.email}
          onClickExecute={this.toggleEmailModal}
        />
        <EmailModal isActive={this.state.emailModal} toggleModal={this.toggleEmailModal} />

        <SettingsSection
          icon='renew-key'
          title={viewStrings.apikey_regen.title}
          currentData={viewStrings.apikey_regen.description}
          onClickExecute={this.toggleApikeyModal}
        />
        <ApiKeyModal isActive={this.state.apikeyModal} toggleModal={this.toggleApikeyModal} />
        <SettingsSection
          icon='dark-light'
          title={viewStrings.dark_mode.title}
          currentData={viewStrings.dark_mode.description}
          onClickExecute={toggleDarkMode}
        />
        <SettingsSection
          icon='warning'
          danger={this.state.extraOptions}
          currentData='Toggle extra options'
          onClickExecute={this.toggleExtraOptions}
        />

        <SettingsSection
          icon='delete-sweep'
          danger
          title={viewStrings.user_media_remove.title}
          currentData={`${viewStrings.user_media_remove.description} (${totalCount} ${viewStrings.user_media_remove.items})`}
          onClickExecute={this.toggleDeleteAllMediaModal}
          hidden={!this.state.extraOptions}
          disabled={totalCount <= 0}
        />
        <DeleteAllMediaModal isActive={this.state.deleteAllUserMediaModal} toggleModal={this.toggleDeleteAllMediaModal} />

        <SettingsSection
          icon='account-remove'
          danger
          title={viewStrings.account_remove.title}
          currentData={viewStrings.account_remove.description}
          onClickExecute={this.toggleDeleteUserAccountModal}
          hidden={!this.state.extraOptions}
        />
        <DeleteUserAccountModal isActive={this.state.deleteUserAccountModal} toggleModal={this.toggleDeleteUserAccountModal} />

      </div>
    )
  }
})
