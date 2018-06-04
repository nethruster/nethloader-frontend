import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Modal from '../../../../../../shared/modal'
import FormInput from '../../../../../../shared/form-input'
import Checkbox from '../../../../../../shared/checkbox'
import Button from '../../../../../../shared/button'
import Spinner from '../../../../../../shared/spinner'

import style from './styles.scss'

const viewStrings = locale.cp.admin.users.user.buttons.edit_user_modal // eslint-disable-line no-undef

const mapStateToProps = (state) => {
  const { token } = state.authentication
  const { isFetchingtoggleAdmin } = state.toggleIsAdmin
  const { isFetching } = state.settings
  const { isFetchingUsers } = state.users

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

  getUsers () {
    return true
  }

  handleIsAdminCheckboxToggle () {
    return true
  }

  handleRenewApiKeySubmit () {
    return true
  }

  handleUsernameChange () {
    return true
  }

  handleEmailChange () {
    return true
  }

  handlePasswordChange () {
    return true
  }

  handleSubmitUsername () {
    return true
  }

  handleSubmitEmail () {
    return true
  }

  handleSubmitPassword () {
    return true
  }

  render ({ isActive, toggleModal, data, isFetchingtoggleAdmin, isFetching, isFetchingUsers }) {
    return (
      <Modal
        isActive={isActive}
        modalTitle={viewStrings.title}
        toggleModal={toggleModal}
        closeButtonText={viewStrings.close}>
        <div class={style.modalContent}>
          <div class={`flex ${style.modalGridItem}`}>
            <span class='flex flex-main-center flex-dc'>
              <h5>{viewStrings.form.username.title}</h5>
              <form ref={(el) => { this.usernameForm = el }}>
                <FormInput
                  inputId={`editName-${data.id}`}
                  inputType='text'
                  inputLabel={this.state.username.value || data.name}
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
                icon='check' />
            </div>
          </div>
          <div class={`flex ${style.modalGridItem}`}>
            <span class='flex flex-main-center flex-dc'>
              <h5>{viewStrings.form.email.title}</h5>
              <form ref={(el) => { this.emailForm = el }}>
                <FormInput
                  inputId={`editEmail-${data.id}`}
                  inputType='email'
                  inputLabel={data.email}
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
                icon='check' />
            </div>
          </div>
          <div class={`flex ${style.modalGridItem}`}>
            <span class='flex flex-main-center flex-dc'>
              <h5>{viewStrings.form.password.title}</h5>
              <form ref={(el) => { this.passwordForm = el }}>
                <FormInput
                  inputId={`editPassword-${data.id}`}
                  inputType='password'
                  inputLabel={viewStrings.form.password.placeholder}
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
                icon='check' />
            </div>
          </div>
          <div class={`flex flex-cross-center ${style.modalGridItem}`}>
            <Checkbox
              text={viewStrings.form.administrator}
              dataId={`isAdmin-${data.id}`}
              tabindex='-1'
              disabled={isFetchingtoggleAdmin || isFetchingUsers}
              isSelected={this.state.isAdmin}
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
            text={viewStrings.form.regen_apikey}
            icon='renew-key'
            spinner={isFetching}
            disabled={isFetching || isFetchingUsers} />
          <span class='flex flex-full-center'>
            {viewStrings.current_apikey}:&nbsp;
            <p>
              {isFetchingUsers
                ? <Spinner size='20px' />
                : data.apiKey}
            </p>
          </span>
        </div>
      </Modal>
    )
  }
})
