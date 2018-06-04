import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Modal from '../../../../shared/modal'
import FormInput from '../../../../shared/form-input'
import { validateEmpty } from 'utils'

const viewStrings = locale.cp.settings.settings_grid.partials.password // eslint-disable-line no-undef

const mapStateToProps = (state) => {
  const { token, sessionData } = state.authentication

  return {
    token,
    sessionData
  }
}

export default connect(mapStateToProps)(class PasswordModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      oldPassword: {
        inputState: 'empty',
        validationMessage: '',
        value: ''
      },
      newPassword: {
        inputState: 'empty',
        validationMessage: '',
        value: ''
      },
      cNewPassword: {
        inputState: 'empty',
        validationMessage: '',
        value: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToggleModal = this.handleToggleModal.bind(this)
  }

  handleChange (event) {
    let state = { ...this.state }

    let input = event.target
    let activeInputOnState = state[event.target.id]

    activeInputOnState.validationMessage = ''
    activeInputOnState.value = event.target.value

    if (validateEmpty(input.value)) {
      activeInputOnState.inputState = 'invalid'
      activeInputOnState.validationMessage = viewStrings.form.empty
    } else if (input.id === 'newPassword' || input.id === 'cNewPassword') {
      if (this.state.newPassword.value !== this.state.cNewPassword.value) {
        state.newPassword.inputState = 'invalid'
        state.cNewPassword.inputState = 'invalid'
        state.newPassword.validationMessage = viewStrings.form.invalid
      } else if (this.state.newPassword.value === this.state.cNewPassword.value && !validateEmpty(this.state.oldPassword.value)) {
        state.oldPassword.inputState = 'valid'
        state.newPassword.inputState = 'valid'
        state.cNewPassword.inputState = 'valid'
        state.newPassword.validationMessage = viewStrings.form.valid
      }
    }

    this.setState({
      ...state
    })
  }

  handleSubmit (event) {
    this.props.toggleModal()
  }

  handleToggleModal () {
    this.props.toggleModal()

    let defaultState = {
      inputState: 'empty',
      value: '',
      validationMessage: ''
    }

    this.setState({
      oldPassword: defaultState,
      newPassword: defaultState,
      cNewPassword: defaultState
    })

    this.form.reset()
  }

  render ({ isActive, toggleModal }) {
    return (
      <Modal
        isActive={isActive}
        modalTitle={viewStrings.title}
        toggleModal={this.handleToggleModal}
        closeButtonText={viewStrings.cancel}
        form
        acceptButtonText={viewStrings.accept}
        onAcceptExecute={this.handleSubmit}>
        <form class={`flex flex-full-center flex-dc`} onSubmit={this.handleSubmit} ref={(el) => { this.form = el }}>
          <FormInput
            inputId='oldPassword'
            inputType='password'
            inputLabel={viewStrings.form.placeholder_current_password}
            changeHandler={this.handleChange}
            required
            inputState={this.state.oldPassword.inputState}
            validationMessage={this.state.oldPassword.validationMessage}
          />
          <FormInput
            inputId='newPassword'
            inputType='password'
            inputLabel={viewStrings.form.placeholder_new_password}
            changeHandler={this.handleChange}
            required
            inputState={this.state.newPassword.inputState}
            validationMessage={this.state.newPassword.validationMessage}
          />
          <FormInput
            inputId='cNewPassword'
            inputType='password'
            inputLabel={viewStrings.form.placeholder_new_password_check}
            changeHandler={this.handleChange}
            required
            noValidationStyle
            inputState={this.state.cNewPassword.inputState}
            validationMessage={this.state.cNewPassword.validationMessage}
          />
        </form>
      </Modal>
    )
  }
})
