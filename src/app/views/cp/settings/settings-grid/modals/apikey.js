import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { showSnack } from 'react-redux-snackbar'

import Modal from '../../../../shared/modal'
import { renewUserApiKey } from 'serverAPI/settings'
import { getUserData } from 'serverAPI/data'

const viewStrings = locale.cp.settings.settings_grid.partials.apikey // eslint-disable-line no-undef

const mapStateToProps = (state) => {
  const { token, sessionData } = state.authentication

  return {
    token,
    sessionData
  }
}

export default connect(mapStateToProps)(class ApiKeyModal extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    this.props.dispatch(renewUserApiKey(this.props.sessionData.id, this.props.token)).then(() => {
      this.props.toggleModal()
      this.props.dispatch(showSnack('apiKeyRegenSuccesful', {
        label: viewStrings.apikey_regenerated,
        timeout: 3000,
        button: { label: viewStrings.toast_ok }
      }))
      this.props.dispatch(getUserData(this.props.sessionData.id, this.props.token))
    })
  }

  render ({ isActive, toggleModal }) {
    return (
      <Modal
        isActive={isActive}
        toggleModal={toggleModal}
        modalTitle={viewStrings.title}
        closeButtonText={viewStrings.cancel}
        acceptButtonText={viewStrings.accept}
        onAcceptExecute={this.handleSubmit}>
        <p class='flex flex-cross-center'>{viewStrings.description}</p>
        <p class='flex flex-cross-center danger-text'>{viewStrings.warning}</p>
      </Modal>
    )
  }
})
