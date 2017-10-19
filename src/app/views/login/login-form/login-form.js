import { h, Component } from 'preact'
import {withRouter} from 'react-router-dom'

import FormInput from './../../shared/form-input/form-input.js'
import Button from '../../shared/button/button.js'

import style from './login-form.scss'

import { requestLogin } from 'login/login-manager'

import locale from 'locale'

const viewStrings = locale.login.form

export default withRouter(class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      loggingIn: false,
      formValidationText: ''
    }

    this.errorMessage = ''

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({
      [event.target.id]: event.target.value,
      formValidationText: ''
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setState({loggingIn: true})

    requestLogin(this.state.email, this.state.password).then((result) => {
      window.sessionStorage.setItem('jwtToken', result)
      this.setState({
        loggingIn: false,
        formValidationText: ''
      })
      this.props.history.push('/cp')
    }).catch((err) => {
      // Reset error message
      this.errorMessage = ''

      // Manage visible UI error messages to avoid hardcoding them in the
      // logic (makes localisation and user feedback control a lot easier)
      switch (err.message) {
        case 'Failed to fetch':
          this.errorMessage = 'Couldn\'t connect to server'
          break
        case 'invalid_server_response':
          this.errorMessage = 'Something went wrong while trying to log in, try again later'
          break
        case 'empty_email':
          this.errorMessage = 'The email field is empty'
          break
        case 'invalid_email':
          this.errorMessage = 'That email is not valid'
          break
        case 'empty_password':
          this.errorMessage = 'The password field is empty'
          break
        case 'invalid_credentials':
          this.errorMessage = 'Invalid credentials'
          break
      }

      this.setState({
        loggingIn: false,
        formValidationText: this.errorMessage || err.message
      })
    })
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
})
