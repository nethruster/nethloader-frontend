import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import Modal from '../../../shared/modal'
import FormInput from '../../../shared/form-input'
import {validateEmpty, validateName} from 'utils'
import {changeUserName} from 'serverAPI/settings'
import {getUserData} from 'serverAPI/data'

const mapStateToProps = (state) => {
  const {token, sessionData} = state.authentication

  return {
    token,
    sessionData
  }
}

export default connect(mapStateToProps)(class UsernameModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      newUsername: {
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
    let newUsername = this.state.newUsername

    let formValidationText = ''
    let input = event.target

    newUsername.value = event.target.value

    if (validateEmpty(input.value)) {
      newUsername.inputState = 'invalid'
      newUsername.validationMessage = 'This field is empty'
    } else if (!validateName(input.value)) {
      newUsername.inputState = 'invalid'
      newUsername.validationMessage = 'Usernames must only contain alphanumeric characters'
    } else {
      newUsername.inputState = 'valid'
      newUsername.validationMessage = 'Cool! This username is valid'
      newUsername.value = input.value
    }

    this.setState({
      newUsername,
      formValidationText
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.state.newUsername.inputState === 'valid') {
      this.props.dispatch(changeUserName(this.state.newUsername.value, this.props.sessionData.id, this.props.token)).then(() => {
        this.props.toggleModal()
        this.props.dispatch(getUserData(this.props.sessionData.id, this.props.token))
        this.form.reset()
      })
    }
  }

  render ({isActive, toggleModal}) {
    return (
      <Modal
        isActive={isActive}
        modalTitle='Change username'
        toggleModal={toggleModal}
        closeButtonText='Cancel'
        acceptButtonText='Change'
        onAcceptExecute={this.handleSubmit}>
        <form class={`flex flex-full-center flex-dc`} onSubmit={this.handleSubmit} ref={(el) => { this.form = el }}>
          <FormInput
            inputId='new-username'
            inputType='text'
            inputLabel='New username'
            changeHandler={this.handleChange}
            required
            inputState={this.state.newUsername.inputState}
            validationMessage={this.state.newUsername.validationMessage}
          />
          <p>{this.state.formValidationText}</p>
        </form>
      </Modal>
    )
  }
})
