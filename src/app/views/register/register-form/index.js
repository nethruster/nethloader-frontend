import {h, Component} from 'preact'
import {connect} from 'preact-redux'
import {showSnack} from 'react-redux-snackbar'

import FormInput from './../../shared/form-input'
import Button from '../../shared/button'
import {validateEmpty, validateEmail, validateName} from 'utils'
import {registerUser} from 'serverAPI/authentication'
import {getStorageParams} from 'serverAPI/data'

import style from './styles.scss'

const viewStrings = locale.register.form // eslint-disable-line no-undef

function mapStateToProps (state) {
  const {isFetching} = state.authentication

  return {isFetching}
}

export default connect(mapStateToProps)(class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        username: {
          inputState: 'empty',
          validationMessage: '',
          value: ''
        },
        email: {
          inputState: 'empty',
          validationMessage: '',
          value: ''
        },
        password: {
          inputState: 'empty',
          validationMessage: '',
          value: ''
        },
        cpassword: {
          inputState: 'empty',
          validationMessage: '',
          value: ''
        }
      },
      formValidationText: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    let data = {
      ...this.state.data
    }

    let formValidationText = ''
    let input = event.target
    let activeInputOnState = data[event.target.id]

    activeInputOnState.validationMessage = ''
    activeInputOnState.value = event.target.value

    if (validateEmpty(input.value)) {
      activeInputOnState.inputState = 'invalid'
      activeInputOnState.validationMessage = viewStrings.validation.empty
    } else if (input.type === 'email' && !validateEmail(input.value)) {
      activeInputOnState.inputState = 'invalid'
      activeInputOnState.validationMessage = viewStrings.validation.invalid_email
    } else if (input.id === 'username' && !validateName(input.value)) {
      activeInputOnState.inputState = 'invalid'
      activeInputOnState.validationMessage = viewStrings.validation.invalid_username
    } else if (input.type === 'password') {
      if (this.state.data.password.value !== this.state.data.cpassword.value) {
        data.password.inputState = 'invalid'
        data.cpassword.inputState = 'invalid'
        data.password.validationMessage = viewStrings.validation.unequal_passwords
      } else if (this.state.data.password.value === this.state.data.cpassword.value) {
        data.password.inputState = 'valid'
        data.cpassword.inputState = 'valid'
        data.password.validationMessage = viewStrings.validation.valid
      }
    } else {
      activeInputOnState.inputState = 'valid'
      activeInputOnState.validationMessage = viewStrings.validation.valid
    }

    this.setState({
      data,
      formValidationText
    })
  }

  async handleSubmit (event) {
    event.preventDefault()
    let data = {
      username: this.state.data.username.value,
      email: this.state.data.email.value,
      password: this.state.data.password.value
    }

    if (this.state.data.username.inputState === 'valid') {
      await this.props.dispatch(registerUser(data, this.context.router.history, event.target)).catch((err) => {
        let errorMessage = ''
        if (err === 'Registration is not allowed in this instance') {
          errorMessage = 'Registration is disabled'
        } else {
          errorMessage = err
        }

        this.props.dispatch(showSnack('loginError', {
          label: errorMessage,
          timeout: 3000,
          button: { label: 'OK' }
        }))
      })
      getStorageParams(this.props.token)
    } else {
      this.props.dispatch(showSnack('invalidUsername', {
        label: this.state.data.username.validationMessage || 'Check the errors and try again',
        timeout: 3000,
        button: { label: 'OK' }
      }))
    }
  }

  render ({isFetching}) {
    return (
      <form class={`${style.form} flex flex-full-center flex-dc`} onSubmit={this.handleSubmit}>
        <FormInput
          inputId='username'
          inputType='text'
          inputLabel='Username'
          changeHandler={this.handleChange}
          required
          inputState={this.state.data.username.inputState}
          validationMessage={this.state.data.username.validationMessage}
        />
        <FormInput
          inputId='email'
          inputType='email'
          inputLabel={viewStrings.email}
          changeHandler={this.handleChange}
          required
          inputState={this.state.data.email.inputState}
          validationMessage={this.state.data.email.validationMessage}
        />
        <FormInput
          inputId='password'
          inputType='password'
          inputLabel={viewStrings.password}
          changeHandler={this.handleChange}
          required
          inputState={this.state.data.password.inputState}
          validationMessage={this.state.data.password.validationMessage}
        />
        <FormInput
          inputId='cpassword'
          inputType='password'
          inputLabel={viewStrings.password_confirm}
          changeHandler={this.handleChange}
          required
          inputState={this.state.data.cpassword.inputState}
          validationMessage={this.state.data.cpassword.validationMessage}
        />
        <p class={style.formValidationText}>{this.state.formValidationText}</p>
        <Button
          contrast
          text={viewStrings.register}
          spinner={isFetching}
          spinnerColor='#fff'
          spinnerSize='24'
          disabled={isFetching}
        />
      </form>
    )
  }
})
