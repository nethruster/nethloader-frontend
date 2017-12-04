import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import FormInput from './../../shared/form-input'
import Button from '../../shared/button'

import locale from 'locale'
import {loginUser} from 'serverAPI/authentication'

import style from './styles.scss'

const viewStrings = locale.login.form

function mapStateToProps (state) {
  const {isFetching} = state.authentication

  return {isFetching}
}

export default connect(mapStateToProps)(class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      credentials: {
        email: '',
        password: ''
      },
      formValidationText: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (this.state.credentials.email !== nextState.credentials.email) ||
      (this.state.credentials.password !== nextState.credentials.password) ||
      (this.props.isFetching !== nextProps.isFetching)
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
    this.props.dispatch(loginUser(this.state.credentials, this.context.router.history, event.target))
  }

  render ({isFetching}) {
    return (
      <form class={`${style.form} flex flex-full-center flex-dc`} onSubmit={this.handleSubmit}>
        <FormInput inputId='email' inputType='email' inputLabel={viewStrings.email} changeHandler={this.handleChange} required noValidationStyle autofocus />
        <FormInput inputId='password' inputType='password' inputLabel={viewStrings.password} changeHandler={this.handleChange} required noValidationStyle />
        <p class={style.formValidationText}>{this.state.formValidationText}</p>
        <Button contrast text={viewStrings.login} spinner={isFetching} spinnerColor='#fff' spinnerSize='14' disabled={isFetching} />
      </form>
    )
  }
})
