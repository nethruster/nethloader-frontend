import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import Modal from '../../../../../../shared/modal'
import FormInput from '../../../../../../shared/form-input'
import Checkbox from '../../../../../../shared/checkbox'
import Button from '../../../../../../shared/button'
import Spinner from '../../../../../../shared/spinner'
import {validateEmpty, validateName, validateEmail} from 'utils'
import {toggleIsAdmin, getUsers} from 'serverAPI/admin-settings'
import {renewUserApiKey, changeUserName, changeUserEmail, changeUserPassword} from 'serverAPI/settings'
import {showSnack} from 'react-redux-snackbar'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {token} = state.authentication
  const {isFetchingtoggleAdmin} = state.toggleIsAdmin
  const {isFetching} = state.settings
  const {isFetchingUsers} = state.users

  return {
    token,
    isFetchingtoggleAdmin,
    isFetching,
    isFetchingUsers
  }
}

export default connect(mapStateToProps)(class EditUserModal extends Component {
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
      isAdmin: props.data.isAdmin
    }

    this.handleIsAdminCheckboxToggle = this.handleIsAdminCheckboxToggle.bind(this)
    this.getUsers = this.getUsers.bind(this)
    this.handleRenewApiKeySubmit = this.handleRenewApiKeySubmit.bind(this)

    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmitUsername = this.handleSubmitUsername.bind(this)
    this.handleSubmitEmail = this.handleSubmitEmail.bind(this)
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this)
  }

  async getUsers () {
    await this.props.dispatch(getUsers(this.props.token))
  }

  async handleIsAdminCheckboxToggle () {
    await this.setState({ isAdmin: !this.state.isAdmin })
    await this.props.dispatch(toggleIsAdmin(this.props.data.id, this.state.isAdmin, this.props.token))
    this.getUsers()
  }

  async handleRenewApiKeySubmit () {
    await this.props.dispatch(renewUserApiKey(this.props.data.id, this.props.token))
    this.getUsers()
  }

  handleUsernameChange (event) {
    let username = this.state.username

    let input = event.target

    username.value = event.target.value

    if (validateEmpty(input.value)) {
      username.inputState = 'invalid'
      username.validationMessage = 'This field is empty'
    } else if (!validateName(input.value)) {
      username.inputState = 'invalid'
      username.validationMessage = 'Only alphanumeric characters'
    } else {
      username.inputState = 'valid'
      username.validationMessage = 'Cool! This username is valid'
      username.value = input.value
    }

    this.setState({
      username
    })
  }

  handleEmailChange (event) {
    let email = this.state.email

    let input = event.target

    email.value = event.target.value

    if (validateEmpty(input.value)) {
      email.inputState = 'invalid'
      email.validationMessage = 'The field is empty'
    } else if (!validateEmail(input.value)) {
      email.inputState = 'invalid'
      email.validationMessage = "Emails include '@' and a domain"
    } else {
      email.inputState = 'valid'
      email.validationMessage = 'Nice! This email is valid'
      email.value = input.value
    }

    this.setState({
      email
    })
  }

  handlePasswordChange (event) {
    let password = this.state.password

    let input = event.target

    password.validationMessage = ''
    password.value = event.target.value

    if (validateEmpty(input.value)) {
      password.inputState = 'invalid'
      password.validationMessage = 'This field is empty'
    } else {
      password.inputState = 'valid'
      password.value = input.value
    }

    this.setState({
      password
    })
  }

  async handleSubmitUsername (event) {
    event.preventDefault()
    if (this.state.username.inputState === 'valid') {
      await this.props.dispatch(changeUserName(this.state.username.value, this.props.data.id, this.props.token))
      await this.getUsers()

      let username = this.state.username
      username.value = ''
      username.inputState = 'empty'
      username.validationMessage = ''
      this.setState({username})

      this.usernameForm.reset()
    } else {
      this.props.dispatch(showSnack('emptyUsernameAdminSettings', {
        label: this.state.newUsername.validationMessage || 'That\'s not a valid username',
        timeout: 3000,
        button: { label: 'OK' }
      }))
    }
  }

  async handleSubmitEmail (event) {
    event.preventDefault()
    if (this.state.email.inputState === 'valid') {
      await this.props.dispatch(changeUserEmail(this.state.email.value, this.props.data.id, this.props.token))
      await this.getUsers()

      let email = this.state.email
      email.value = ''
      email.inputState = 'empty'
      email.validationMessage = ''
      this.setState({email})

      this.emailForm.reset()
    } else {
      this.props.dispatch(showSnack('emptyEmailAdminSettings', {
        label: this.state.newEmail.validationMessage || 'That\'s not a valid email',
        timeout: 3000,
        button: { label: 'OK' }
      }))
    }
  }

  async handleSubmitPassword (event) {
    event.preventDefault()
    if (this.state.password.inputState === 'valid') {
      await this.props.dispatch(changeUserPassword('', this.state.password.value, this.props.data.id, this.props.token))
      await this.getUsers()

      let password = this.state.password
      password.value = ''
      password.inputState = 'empty'
      password.validationMessage = ''
      this.setState({password})

      this.passwordForm.reset()
    } else {
      this.props.dispatch(showSnack('emptyPasswordAdminSettings', {
        label: this.state.password.validationMessage || 'That\'s an empty password',
        timeout: 3000,
        button: { label: 'OK' }
      }))
    }
  }

  render ({isActive, toggleModal, data, isFetchingtoggleAdmin, isFetching, isFetchingUsers}) {
    return (
      <Modal
        isActive={isActive}
        modalTitle='Edit user'
        toggleModal={toggleModal}
        closeButtonText='Close'>
        <div class={style.modalContent}>
          <div class={`flex ${style.modalGridItem}`}>
            <span class='flex flex-main-center flex-dc'>
              <h5>Username</h5>
              <form ref={(el) => { this.usernameForm = el }} onSubmit={this.handleSubmitUsername}>
                <FormInput
                  inputId={`editName-${data.id}`}
                  inputType='text'
                  inputLabel={this.state.username.value || data.name}
                  changeHandler={this.handleUsernameChange}
                  required
                  inputState={this.state.username.inputState}
                  validationMessage={this.state.username.validationMessage}
                />
              </form>
            </span>
            <div class={`flex flex-full-center ${style.confirmButton}`}>
              <Button
                disabled={this.state.username.inputState !== 'valid' || isFetchingUsers}
                iconButton
                icon='check'
                onClickExecute={this.handleSubmitUsername} />
            </div>
          </div>
          <div class={`flex ${style.modalGridItem}`}>
            <span class='flex flex-main-center flex-dc'>
              <h5>Email</h5>
              <form ref={(el) => { this.emailForm = el }} onSubmit={this.handleSubmitEmail}>
                <FormInput
                  inputId={`editEmail-${data.id}`}
                  inputType='email'
                  inputLabel={data.email}
                  changeHandler={this.handleEmailChange}
                  required
                  inputState={this.state.email.inputState}
                  validationMessage={this.state.email.validationMessage}
                />
              </form>
            </span>
            <div class={`flex flex-full-center ${style.confirmButton}`}>
              <Button
                disabled={this.state.email.inputState !== 'valid' || isFetchingUsers}
                iconButton
                icon='check'
                onClickExecute={this.handleSubmitEmail} />
            </div>
          </div>
          <div class={`flex ${style.modalGridItem}`}>
            <span class='flex flex-main-center flex-dc'>
              <h5>Password</h5>
              <form ref={(el) => { this.passwordForm = el }} onSubmit={this.handleSubmitPassword}>
                <FormInput
                  inputId={`editPassword-${data.id}`}
                  inputType='password'
                  inputLabel="Do you know it? We don't."
                  changeHandler={this.handlePasswordChange}
                  required
                  inputState={this.state.password.inputState}
                  validationMessage={this.state.password.validationMessage}
                />
              </form>
            </span>
            <div class={`flex flex-full-center ${style.confirmButton}`}>
              <Button
                disabled={this.state.password.inputState !== 'valid' || isFetchingUsers}
                iconButton
                icon='check'
                onClickExecute={this.handleSubmitPassword} />
            </div>
          </div>
          <div class={`flex flex-cross-center ${style.modalGridItem}`}>
            <Checkbox
              text='Administrator'
              dataId={`isAdmin-${data.id}`}
              tabindex='-1'
              disabled={isFetchingtoggleAdmin || isFetchingUsers}
              isSelected={this.state.isAdmin}
              onChangeHandler={this.handleIsAdminCheckboxToggle}
              customClass={style.customModalClass}
            />
            {
              isFetchingtoggleAdmin || isFetchingUsers
                ? <span><Spinner size='28px' /></span>
                : null
            }
          </div>
        </div>
        <div class={`flex flex-full-center flex-dc ${style.button}`}>
          <Button
            text='Regen APIkey'
            icon='renew-key'
            onClickExecute={this.handleRenewApiKeySubmit}
            spinner={isFetching}
            disabled={isFetching || isFetchingUsers} />
          <span class='flex flex-full-center'>Current apiKey:&nbsp;
            <small>
              {
                isFetchingUsers
                  ? <Spinner size='20px' />
                  : data.apiKey
              }
            </small>
          </span>
        </div>
      </Modal>
    )
  }
})
