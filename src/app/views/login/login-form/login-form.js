import { h, Component } from 'preact'

import FormInput from './../../shared/form-input/form-input.js'
import Button from '../../shared/button/button.js'

import style from './login-form.scss'

import locale from 'locale'

const viewStrings = locale.login.form

export default class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      credentials: {
        email: '',
        password: ''
      },
      loggingIn: false,
      formValidationText: ''
    }

    this.errorMessage = ''

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    let credentials = {
      ...this.state.credentials
    }

    credentials[event.target.id] = event.target.value

    this.setState({
      credentials,
      formValidationText: ''
    })
  }

  handleSubmit (event) {
    event.preventDefault()
  }

  render () {
    return (
      <form class={`${style.form} flex flex-full-center flex-dc`} onSubmit={this.handleSubmit}>
        <FormInput inputId='email' inputType='email' inputLabel={viewStrings.email} changeHandler={this.handleChange} required noValidationStyle />
        <FormInput inputId='password' inputType='password' inputLabel={viewStrings.password} changeHandler={this.handleChange} required noValidationStyle />
        <p class={style.formValidationText}>{this.state.formValidationText}</p>
        <Button contrast text={viewStrings.login} spinner={this.state.loggingIn} spinnerColor='#fff' spinnerSize='14' />
      </form>
    )
  }
}
