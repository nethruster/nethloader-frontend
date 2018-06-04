import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { showSnack } from 'react-redux-snackbar'

import Modal from '../../../../shared/modal'
import FormInput from '../../../../shared/form-input'
import { validateEmpty, validateEmail } from 'utils'
import { getUserData } from 'serverAPI/data'

const viewStrings = locale.cp.settings.settings_grid.partials.email // eslint-disable-line no-undef

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
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToggleModal = this.handleToggleModal.bind(this)
  }

  handleChange (event) {
    let newEmail = this.state.newEmail

    let input = event.target

    newEmail.value = event.target.value

    if (validateEmpty(input.value)) {
      newEmail.inputState = 'invalid'
      newEmail.validationMessage = viewStrings.form.empty
    } else if (!validateEmail(input.value)) {
      newEmail.inputState = 'invalid'
      newEmail.validationMessage = viewStrings.form.invalid
    } else {
      newEmail.inputState = 'valid'
      newEmail.validationMessage = viewStrings.form.valid
      newEmail.value = input.value
    }

    this.setState({
      newEmail
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.state.newEmail.inputState === 'valid') {
      this.props.toggleModal()
      this.props.dispatch(getUserData(this.props.sessionData.id, this.props.token)).then(() => {
        this.props.dispatch(showSnack('emailChangeSuccesful', {
          label: viewStrings.toast.email_changed,
          timeout: 3000,
          button: { label: viewStrings.toast.toast_ok }
        }))
      })
      this.form.reset()
    } else {
      this.props.dispatch(showSnack('emptyEmailSettings', {
        label: this.state.newEmail.validationMessage || viewStrings.form.submit_error,
        timeout: 3000,
        button: { label: viewStrings.toast_ok }
      }))
    }
  }

  handleToggleModal () {
    this.props.toggleModal()

    let newEmail = {
      inputState: 'empty',
      value: '',
      validationMessage: ''
    }

    this.setState({
      newEmail
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
        acceptButtonText={viewStrings.accept}
        form
        onAcceptExecute={this.handleSubmit}>
        <form class={`flex flex-full-center flex-dc`} onSubmit={this.handleSubmit} ref={(el) => { this.form = el }}>
          <FormInput
            inputId='new-email'
            inputType='email'
            inputLabel={viewStrings.form.placeholder}
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
