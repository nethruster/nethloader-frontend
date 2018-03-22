import {h, Component} from 'preact'
import {connect} from 'preact-redux'
import {showSnack} from 'react-redux-snackbar'

import Modal from '../../../../shared/modal'
import FormInput from '../../../../shared/form-input'
import {validateEmpty} from 'utils'
import {deleteUser} from 'serverAPI/settings'
import {logoutUser} from 'serverAPI/authentication'

const viewStrings = locale.cp.settings.settings_grid.partials.account_remove // eslint-disable-line no-undef

const mapStateToProps = (state) => {
  const {token, sessionData} = state.authentication
  const {isFetching} = state.settings

  return {
    token,
    sessionData,
    isFetching
  }
}

export default connect(mapStateToProps)(class DeleteUserAccountModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      passwordInput: {
        inputState: 'empty',
        validationMessage: '',
        value: ''
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleToggleModal = this.handleToggleModal.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.state.passwordInput.inputState === 'valid') {
      this.props.dispatch(deleteUser(this.props.sessionData.id, this.props.token, this.state.passwordInput.value)).then(() => {
        this.props.toggleModal()
        this.form.reset()
        this.props.dispatch(logoutUser())
      }).catch(err => {
        let errorMessage = ''
        if (err === 'Unauthorized') {
          errorMessage = viewStrings.incorrect_password
        } else {
          errorMessage = err
        }
        this.props.dispatch(showSnack('wrongPasswordDeleteUser', {
          label: errorMessage,
          timeout: 3000,
          button: { label: 'OK' }
        }))
      })
    } else {
      this.props.dispatch(showSnack('emptyPasswordDeleteMedia', {
        label: this.state.passwordInput.validationMessage || viewStrings.empty_password,
        timeout: 3000,
        button: { label: 'OK' }
      }))
    }
  }

  handleChange (event) {
    let passwordInput = this.state.passwordInput

    if (validateEmpty(event.target.value)) {
      passwordInput.inputState = 'invalid'
      passwordInput.validationMessage = viewStrings.empty_password
    } else {
      passwordInput.value = event.target.value
      passwordInput.inputState = 'valid'
      passwordInput.validationMessage = ''
    }

    this.setState({ passwordInput })
  }

  handleToggleModal () {
    this.props.toggleModal()

    let passwordInput = {
      inputState: 'empty',
      value: '',
      validationMessage: ''
    }

    this.setState({
      passwordInput
    })

    this.form.reset()
  }

  render ({isActive, toggleModal, isFetching}) {
    return (
      <Modal
        isActive={isActive}
        disabled={isFetching}
        toggleModal={this.handleToggleModal}
        form
        modalTitle={viewStrings.title}
        closeButtonText={viewStrings.cancel}
        acceptButtonText={viewStrings.accept}
        onAcceptExecute={this.handleSubmit}>
        <p class='flex flex-full-center'>{viewStrings.description}</p>
        <p class='flex flex-full-center danger-text'>{viewStrings.warning}</p>
        <small>{viewStrings.type_password_to_confirm}</small>
        <form class={`flex flex-full-center flex-dc`} onSubmit={this.handleSubmit} ref={(el) => { this.form = el }}>
          <FormInput
            inputId='user-password-delete-account'
            inputType='password'
            inputLabel='Account password'
            changeHandler={this.handleChange}
            required
            inputState={this.state.passwordInput.inputState}
            validationMessage={this.state.passwordInput.validationMessage}
          />
        </form>
      </Modal>
    )
  }
})
