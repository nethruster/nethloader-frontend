import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import Modal from '../../../../../../../../shared/modal'
import FormInput from '../../../../../../../../shared/form-input'
import Checkbox from '../../../../../../../../shared/checkbox'
import Button from '../../../../../../../../shared/button'
import Spinner from '../../../../../../../../shared/spinner'
import {toggleIsAdmin, getUsers} from 'serverAPI/admin-settings'
import {renewUserApiKey} from 'serverAPI/settings'

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
      isAdmin: props.data.isAdmin
    }

    this.handleIsAdminCheckboxToggle = this.handleIsAdminCheckboxToggle.bind(this)
    this.getUsers = this.getUsers.bind(this)
    this.handleRenewApiKeySubmit = this.handleRenewApiKeySubmit.bind(this)
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
              <FormInput
                inputId={`editName-${data.id}`}
                inputType='text'
                inputLabel={data.name}
                changeHandler={this.handleChange}
                required
                inputState={this.state.email.inputState}
                validationMessage={this.state.email.validationMessage}
              />
            </span>
            <div class={`flex flex-full-center ${style.confirmButton}`}><Button disabled={this.state.username !== 'valid' || !isFetchingUsers} iconButton icon='check' /></div>
          </div>
          <div class={`flex ${style.modalGridItem}`}>
            <span class='flex flex-main-center flex-dc'>
              <h5>Email</h5>
              <FormInput
                inputId={`editEmail-${data.id}`}
                inputType='email'
                inputLabel={data.email}
                changeHandler={this.handleChange}
                required
                inputState={this.state.email.inputState}
                validationMessage={this.state.email.validationMessage}
              />
            </span>
            <div class={`flex flex-full-center ${style.confirmButton}`}><Button disabled={this.state.email !== 'valid' || !isFetchingUsers} iconButton icon='check' /></div>
          </div>
          <div class={`flex ${style.modalGridItem}`}>
            <span class='flex flex-main-center flex-dc'>
              <h5>Password</h5>
              <FormInput
                inputId={`editPassword-${data.id}`}
                inputType='password'
                inputLabel="Do you know it? We don't."
                changeHandler={this.handleChange}
                required
                inputState={this.state.email.inputState}
                validationMessage={this.state.email.validationMessage}
              />
            </span>
            <div class={`flex flex-full-center ${style.confirmButton}`}><Button disabled={this.state.password !== 'valid' || isFetchingUsers} iconButton icon='check' /></div>
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
            {isFetchingtoggleAdmin || isFetchingUsers ? <span><Spinner size='28px' /></span> : null}
          </div>
        </div>
        <div class={`flex flex-full-center flex-dc ${style.button}`}>
          <Button text='Regen APIkey' icon='renew-key' onClickExecute={this.handleRenewApiKeySubmit} spinner={isFetching} disabled={isFetching || isFetchingUsers} />
          <span class='flex flex-full-center'>Current apiKey:&nbsp;<small>{isFetchingUsers ? <Spinner size='20px' /> : data.apiKey}</small></span>
        </div>
      </Modal>
    )
  }
})
