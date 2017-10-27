import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import FormInput from './../../shared/form-input/form-input.js'
import Button from '../../shared/button/button.js'

import { registerUser } from 'serverAPI'
import { validateEmpty, validateEmail, validateName } from 'utils'

import style from './register-form.scss'

import locale from 'locale'

const viewStrings = locale.login.form

function mapStateToProps (state) {
  const {isFetching} = state.account

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
      activeInputOnState.validationMessage = 'This field is empty'
    } else if (input.type === 'email' && !validateEmail(input.value)) {
      activeInputOnState.inputState = 'invalid'
      activeInputOnState.validationMessage = 'Emails should include \'@\' and a domain name'
    } else if (input.id === 'username' && !validateName(input.value)) {
      activeInputOnState.inputState = 'invalid'
      activeInputOnState.validationMessage = 'Usernames should only contain alphanumeric characters'
    } else if (input.type === 'password') {
      if (this.state.data.password.value !== this.state.data.cpassword.value) {
        data.password.inputState = 'invalid'
        data.cpassword.inputState = 'invalid'
        data.password.validationMessage = 'Password fields don\'t match, make sure they are the same'
      } else if (this.state.data.password.value === this.state.data.cpassword.value) {
        data.password.inputState = 'valid'
        data.cpassword.inputState = 'valid'
        data.password.validationMessage = 'Valid'
      }
    } else {
      activeInputOnState.inputState = 'valid'
      activeInputOnState.validationMessage = 'Valid'
    }

    this.setState({
      data,
      formValidationText
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    let data = {
      username: this.state.data.username.value,
      email: this.state.data.email.value,
      password: this.state.data.password.value
    }
    this.props.dispatch(registerUser(data, this.context.router.history))
  }
  render ({dispatch, isFetching}) {
    return (
      <form class={`${style.form} flex flex-full-center flex-dc`} onSubmit={this.handleSubmit}>
        <FormInput inputId='username' inputType='text' inputLabel='Username' changeHandler={this.handleChange} required inputState={this.state.data.username.inputState} validationMessage={this.state.data.username.validationMessage} />
        <FormInput inputId='email' inputType='email' inputLabel={viewStrings.email} changeHandler={this.handleChange} required inputState={this.state.data.email.inputState} validationMessage={this.state.data.email.validationMessage} />
        <FormInput inputId='password' inputType='password' inputLabel={viewStrings.password} changeHandler={this.handleChange} required inputState={this.state.data.password.inputState} validationMessage={this.state.data.password.validationMessage} />
        <FormInput inputId='cpassword' inputType='password' inputLabel='Retype Password' changeHandler={this.handleChange} required inputState={this.state.data.cpassword.inputState} validationMessage={this.state.data.cpassword.validationMessage} />
        <p class={style.formValidationText}>{this.state.formValidationText}</p>
        <Button contrast text='Register' spinner={isFetching} spinnerColor='#fff' spinnerSize='14' />
      </form>
    )
  }
})
