import {h, Component} from 'preact'
import {connect} from 'preact-redux'
import {showSnack} from 'react-redux-snackbar'

import Modal from '../../../../shared/modal'
import FormInput from '../../../../shared/form-input'
import {validateEmpty} from 'utils'
import {changeUserPassword} from 'serverAPI/settings'
import {logoutUser} from 'serverAPI/authentication'

const mapStateToProps = (state) => {
  const {token, sessionData} = state.authentication

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
      },
      formValidationText: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    let state = {...this.state}

    let formValidationText = ''
    let input = event.target
    let activeInputOnState = state[event.target.id]

    activeInputOnState.validationMessage = ''
    activeInputOnState.value = event.target.value

    if (validateEmpty(input.value)) {
      activeInputOnState.inputState = 'invalid'
      activeInputOnState.validationMessage = 'This field is empty'
    } else if (input.id === 'newPassword' || input.id === 'cNewPassword') {
      if (this.state.newPassword.value !== this.state.cNewPassword.value) {
        state.newPassword.inputState = 'invalid'
        state.cNewPassword.inputState = 'invalid'
        state.newPassword.validationMessage = "Password fields don't match, make sure they are the same"
      } else if (this.state.newPassword.value === this.state.cNewPassword.value && this.state.oldPassword.inputState !== 'empty') {
        state.oldPassword.inputState = 'valid'
        state.newPassword.inputState = 'valid'
        state.cNewPassword.inputState = 'valid'
        state.newPassword.validationMessage = 'Valid'
      }
    }

    this.setState({
      ...state,
      formValidationText
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.state.newPassword.inputState === 'valid' && this.state.oldPassword.inputState === 'valid') {
      this.props.dispatch(changeUserPassword(this.state.oldPassword.value, this.state.newPassword.value, this.props.sessionData.id, this.props.token)).then(() => {
        this.props.toggleModal()
        this.form.reset()
        this.props.dispatch(logoutUser(this.props.sessionData.id, this.props.token))
      })
    } else {
      this.props.dispatch(showSnack('emptyPasswordSettings', {
        label: this.state.newPassword.validationMessage || 'Please, fill in all the fields',
        timeout: 3000,
        button: { label: 'OK' }
      }))
    }
  }

  render ({isActive, toggleModal}) {
    return (
      <Modal
        isActive={isActive}
        modalTitle='Change password'
        toggleModal={toggleModal}
        closeButtonText='Cancel'
        acceptButtonText='Change'
        onAcceptExecute={this.handleSubmit}>
        <form class={`flex flex-full-center flex-dc`} onSubmit={this.handleSubmit} ref={(el) => { this.form = el }}>
          <FormInput
            inputId='oldPassword'
            inputType='password'
            inputLabel='Current password'
            changeHandler={this.handleChange}
            required
            inputState={this.state.oldPassword.inputState}
            validationMessage={this.state.oldPassword.validationMessage}
          />
          <FormInput
            inputId='newPassword'
            inputType='password'
            inputLabel='New password'
            changeHandler={this.handleChange}
            required
            inputState={this.state.newPassword.inputState}
            validationMessage={this.state.newPassword.validationMessage}
          />
          <FormInput
            inputId='cNewPassword'
            inputType='password'
            inputLabel='Retype new password'
            changeHandler={this.handleChange}
            required
            noValidationStyle
            inputState={this.state.cNewPassword.inputState}
            validationMessage={this.state.cNewPassword.validationMessage}
          />
          <p>{this.state.formValidationText}</p>
        </form>
      </Modal>
    )
  }
})
