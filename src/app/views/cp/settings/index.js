import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import Sidebar from './sidebar'
import SettingsSection from './settings-section'
import UsernameModal from './modals/username'
import EmailModal from './modals/email'
import PasswordModal from './modals/password'
import ApiKeyModal from './modals/apikey'
import DeleteAllMediaModal from './modals/delete-all-media'
import {copyToClipboard} from 'utils'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {userData} = state.userData

  return {userData}
}

export default connect(mapStateToProps)(class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      usernameModal: false,
      emailModal: false,
      passwordModal: false,
      apikeyModal: false,
      deleteAllUserMediaModal: false,
      apiKeyCopied: false
    }

    this.toggleUsernameModal = this.toggleUsernameModal.bind(this)
    this.toggleEmailModal = this.toggleEmailModal.bind(this)
    this.togglePasswordModal = this.togglePasswordModal.bind(this)
    this.toggleApikeyModal = this.toggleApikeyModal.bind(this)
    this.toggleDeleteAllMediaModal = this.toggleDeleteAllMediaModal.bind(this)
    this.handleCopyClick = this.handleCopyClick.bind(this)
  }

  toggleUsernameModal () {
    this.setState({usernameModal: !this.state.usernameModal})
  }

  toggleEmailModal () {
    this.setState({emailModal: !this.state.emailModal})
  }

  togglePasswordModal () {
    this.setState({passwordModal: !this.state.passwordModal})
  }

  toggleApikeyModal () {
    this.setState({apikeyModal: !this.state.apikeyModal})
  }

  toggleDeleteAllMediaModal () {
    this.setState({deleteAllUserMediaModal: !this.state.deleteAllUserMediaModal})
  }

  handleCopyClick (event) {
    copyToClipboard(event)

    this.setState({ apiKeyCopied: true })

    setTimeout(() => {
      this.setState({ apiKeyCopied: false })
    }, 1500)
  }

  render ({userData}) {
    return (
      <div class={`flex ${style.settings}`}>
        <Sidebar />
        <div class={style.settingsGridContainer}>
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
            icon='copy'
            title='Copy APIKey'
            dataCopy={userData.apiKey}
            currentData={this.state.apiKeyCopied ? 'Copied!' : 'Copy your current APIKey to the clipboard.'}
            onClickExecute={this.handleCopyClick}
          />

          <SettingsSection
            icon='auto-upload'
            title='Regenerate APIkey'
            currentData='Generate a new APIKey. This will replace your current one.'
            onClickExecute={this.toggleApikeyModal}
          />
          <ApiKeyModal isActive={this.state.apikeyModal} toggleModal={this.toggleApikeyModal} />

          <SettingsSection
            icon='delete-sweep'
            title='Delete all media'
            currentData='Delete all your images and videos.'
            onClickExecute={this.toggleDeleteAllMediaModal}
          />
          <DeleteAllMediaModal isActive={this.state.deleteAllUserMediaModal} toggleModal={this.toggleDeleteAllMediaModal} />
        </div>

      </div>
    )
  }
})
