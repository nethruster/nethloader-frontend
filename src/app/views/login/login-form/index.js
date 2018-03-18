import {h, Component} from 'preact'
import {connect} from 'preact-redux'
import {showSnack} from 'react-redux-snackbar'

import FormInput from './../../shared/form-input'
import Button from '../../shared/button'
import Checkbox from '../../shared/checkbox'
import {loginUser} from 'serverAPI/authentication'

import style from './styles.scss'

const viewStrings = locale.login.form // eslint-disable-line no-undef

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
      maintainSession: false,
      formValidationText: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleMaintainSessionCheckboxToggle = this.handleMaintainSessionCheckboxToggle.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (this.state.credentials.email !== nextState.credentials.email) ||
      (this.state.credentials.password !== nextState.credentials.password) ||
      (this.props.isFetching !== nextProps.isFetching) ||
      (this.state.maintainSession !== nextState.maintainSession)
  }

  handleMaintainSessionCheckboxToggle () {
    this.setState({maintainSession: !this.state.maintainSession})
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

  async handleSubmit (event) {
    event.preventDefault()
    await this.props.dispatch(loginUser(this.state.credentials, this.state.maintainSession, this.context.router.history, event.target)).catch(err => {
      let errorMessage = ''
      if (err === 'Unexistent user') {
        errorMessage = 'User does not exist'
      } else if (err === 'Wrong password') {
        errorMessage = 'Wrong password'
      } else {
        errorMessage = err
      }

      this.props.dispatch(showSnack('loginError', {
        label: errorMessage,
        timeout: 3000,
        button: { label: 'OK' }
      }))
    })
  }

  render ({isFetching}) {
    return (
      <form class={`${style.form} flex flex-full-center flex-dc`} onSubmit={this.handleSubmit}>
        <FormInput
          inputId='email'
          inputType='email'
          inputLabel={viewStrings.email}
          changeHandler={this.handleChange}
          required
          tabindex='1'
          noValidationStyle
          autofocus
        />
        <FormInput
          inputId='password'
          inputType='password'
          inputLabel={viewStrings.password}
          changeHandler={this.handleChange}
          required
          tabindex='2'
          noValidationStyle
        />
        <p class={style.formValidationText}>{this.state.formValidationText}</p>
        <div class={style.maintainSessionCheckbox}>
          <Checkbox
            text='Keep me logged in'
            dataId='maintainSession'
            tabindex='-1'
            isSelected={this.state.maintainSession}
            onChangeHandler={this.handleMaintainSessionCheckboxToggle}
          />
        </div>
        <Button
          contrast
          text={viewStrings.login}
          spinner={isFetching}
          spinnerColor='#fff'
          tabindex='4'
          spinnerSize='24'
          disabled={isFetching}
        />
      </form>
    )
  }
})
