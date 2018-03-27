import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { showSnack } from 'react-redux-snackbar'

import Modal from '../../../../../../shared/modal'
import FormInput from '../../../../../../shared/form-input'
import Checkbox from '../../../../../../shared/checkbox'
import { validateEmpty, validateEmail, validateName } from 'utils'
import { createUser, getUsers } from 'serverAPI/admin-settings'

import style from './styles.scss'

const viewStrings = locale.cp.admin.users.toolbar.add_user_modal // eslint-disable-line no-undef

const mapStateToProps = (state) => {
  const { token } = state.authentication

  return { token }
}

export default connect(mapStateToProps)(class CreateUserModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: {
        inputState: 'empty',
        validationMessage: '',
        value: ''
      },
      username: {
        inputState: 'empty',
        validationMessage: '',
        value: ''
      },
      password: {
        inputState: 'empty',
        validationMessage: '',
        value: ''
      },
      willBeAdmin: false
    }

    this.defaultState = {
      email: {
        inputState: 'empty',
        validationMessage: '',
        value: ''
      },
      username: {
        inputState: 'empty',
        validationMessage: '',
        value: ''
      },
      password: {
        inputState: 'empty',
        validationMessage: '',
        value: ''
      },
      willBeAdmin: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleWillBeAdminCheckboxToggle = this.handleWillBeAdminCheckboxToggle.bind(this)
  }

  async getUsers () {
    await this.props.dispatch(getUsers(this.props.token))
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
    } else if (input.type === 'email' && !validateEmail(input.value)) {
      activeInputOnState.inputState = 'invalid'
      activeInputOnState.validationMessage = viewStrings.form.email.invalid
    } else if (input.id === 'username' && !validateName(input.value)) {
      activeInputOnState.inputState = 'invalid'
      activeInputOnState.validationMessage = viewStrings.form.username.only_aplhanum
    } else {
      activeInputOnState.inputState = 'valid'
      activeInputOnState.validationMessage = viewStrings.form.valid
    }

    this.setState({
      ...state
    })
  }

  handleWillBeAdminCheckboxToggle () {
    this.setState({ willBeAdmin: !this.state.willBeAdmin })
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.state.email.inputState === 'valid' && this.state.username.inputState === 'valid') {
      this.props.dispatch(createUser(this.state.username.value, this.state.email.value, this.state.password.value, this.state.willBeAdmin, this.props.token)).then(() => {
        this.form.reset()
        this.setState({ ...this.defaultState })
        this.getUsers()
        this.props.toggleModal()
      })
    } else {
      this.props.dispatch(showSnack('invalidOrEmptyAddUser', {
        label: this.state.username.validationMessage || this.state.email.validationMessage || viewStrings.form.empty_fields,
        timeout: 3000,
        button: { label: viewStrings.toast_ok }
      }))
    }
  }

  render ({ isActive, toggleModal }) {
    return (
      <Modal
        isActive={isActive}
        modalTitle={viewStrings.title}
        toggleModal={toggleModal}
        closeButtonText={viewStrings.cancel}
        acceptButtonText={viewStrings.accept}
        form
        onAcceptExecute={this.handleSubmit}>
        <form class={`flex flex-full-center flex-dc`} onSubmit={this.handleSubmit} ref={(el) => { this.form = el }}>
          <FormInput
            inputId='email'
            inputType='email'
            inputLabel={viewStrings.form.email.title}
            changeHandler={this.handleChange}
            required
            inputState={this.state.email.inputState}
            validationMessage={this.state.email.validationMessage}
          />
          <FormInput
            inputId='username'
            inputType='text'
            inputLabel={viewStrings.form.username.title}
            changeHandler={this.handleChange}
            required
            inputState={this.state.username.inputState}
            validationMessage={this.state.username.validationMessage}
          />
          <FormInput
            inputId='password'
            inputType='password'
            inputLabel={viewStrings.form.password.title}
            changeHandler={this.handleChange}
            required
            noValidationStyle
            inputState={this.state.password.inputState}
            validationMessage={this.state.password.validationMessage}
          />
          <div class={style.willBeAdminCheckbox}>
            <Checkbox
              text={viewStrings.form.make_admin}
              dataId='willBeAdmin'
              tabindex='-1'
              isSelected={this.state.willBeAdmin}
              onChangeHandler={this.handleWillBeAdminCheckboxToggle}
            />
          </div>
        </form>
      </Modal>
    )
  }
})
