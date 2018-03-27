import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { showSnack } from 'react-redux-snackbar'

import Modal from '../../../../shared/modal'
import FormInput from '../../../../shared/form-input'
import { validateEmpty, validateName } from 'utils'
import { changeUserName } from 'serverAPI/settings'
import { getUserData } from 'serverAPI/data'

const viewStrings = locale.cp.settings.settings_grid.partials.username // eslint-disable-line no-undef

const mapStateToProps = (state) => {
  const { token, sessionData } = state.authentication

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
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToggleModal = this.handleToggleModal.bind(this)
  }

  handleChange (event) {
    let newUsername = this.state.newUsername

    let input = event.target

    newUsername.value = event.target.value

    if (validateEmpty(input.value)) {
      newUsername.inputState = 'invalid'
      newUsername.validationMessage = viewStrings.form.empty
    } else if (!validateName(input.value)) {
      newUsername.inputState = 'invalid'
      newUsername.validationMessage = viewStrings.form.only_aplhanum
    } else {
      newUsername.inputState = 'valid'
      newUsername.validationMessage = viewStrings.form.valid
      newUsername.value = input.value
    }

    this.setState({
      newUsername
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
    } else {
      this.props.dispatch(showSnack('emptyUsernameSettings', {
        label: this.state.newUsername.validationMessage || viewStrings.form.submit_error,
        timeout: 3000,
        button: { label: viewStrings.toast_ok }
      }))
    }
  }

  handleToggleModal () {
    this.props.toggleModal()
    let newUsername = {
      inputState: 'empty',
      value: '',
      validationMessage: ''
    }

    this.setState({
      newUsername
    })

    this.form.reset()
  }

  render ({ isActive, toggleModal }) {
    return (
      <Modal
        isActive={isActive}
        modalTitle={viewStrings.title}
        toggleModal={this.handleToggleModal}
        form
        closeButtonText={viewStrings.cancel}
        acceptButtonText={viewStrings.accept}
        onAcceptExecute={this.handleSubmit}>
        <form class={`flex flex-full-center flex-dc`} onSubmit={this.handleSubmit} ref={(el) => { this.form = el }}>
          <FormInput
            inputId='new-username'
            inputType='text'
            inputLabel={viewStrings.form.placeholder}
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
