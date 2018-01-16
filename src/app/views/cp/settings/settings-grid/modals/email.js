import {h, Component} from 'preact'
import {connect} from 'preact-redux'
import {showSnack} from 'react-redux-snackbar'

import Modal from '../../../../shared/modal'
import FormInput from '../../../../shared/form-input'
import {validateEmpty, validateEmail} from 'utils'
import {changeUserEmail} from 'serverAPI/settings'
import {getUserData} from 'serverAPI/data'

const mapStateToProps = (state) => {
  const { token, sessionData } = state.authentication

  return {
    token,
    sessionData
  }
}

export default connect(mapStateToProps)(class EmailModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      newEmail: {
        inputState: 'empty',
        value: '',
        validationMessage: ''
      },
      formValidationText: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    let newEmail = this.state.newEmail

    let formValidationText = ''
    let input = event.target

    newEmail.value = event.target.value

    if (validateEmpty(input.value)) {
      newEmail.inputState = 'invalid'
      newEmail.validationMessage = 'The field is empty'
    } else if (!validateEmail(input.value)) {
      newEmail.inputState = 'invalid'
      newEmail.validationMessage = "Emails must include '@' and a domain name"
    } else {
      newEmail.inputState = 'valid'
      newEmail.validationMessage = 'Nice! This email is valid'
      newEmail.value = input.value
    }

    this.setState({
      newEmail,
      formValidationText
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.state.newEmail.inputState === 'valid') {
      this.props.dispatch(changeUserEmail(this.state.newEmail.value, this.props.sessionData.id, this.props.token)).then(() => {
        this.props.toggleModal()
        this.props.dispatch(getUserData(this.props.sessionData.id, this.props.token))
        this.form.reset()
      })
    } else {
      this.props.dispatch(showSnack('emptyEmailSettings', {
        label: this.state.newEmail.validationMessage || 'That\'s not a valid email',
        timeout: 3000,
        button: { label: 'OK' }
      }))
    }
  }

  render ({isActive, toggleModal}) {
    return (
      <Modal
        isActive={isActive}
        modalTitle='Change email'
        toggleModal={toggleModal}
        closeButtonText='Cancel'
        acceptButtonText='Change'
        form
        onAcceptExecute={this.handleSubmit}>
        <form class={`flex flex-full-center flex-dc`} onSubmit={this.handleSubmit} ref={(el) => { this.form = el }}>
          <FormInput
            inputId='new-email'
            inputType='email'
            inputLabel='New email'
            changeHandler={this.handleChange}
            required
            inputState={this.state.newEmail.inputState}
            validationMessage={this.state.newEmail.validationMessage}
          />
          <p>{this.state.formValidationText}</p>
        </form>
      </Modal>
    )
  }
})
