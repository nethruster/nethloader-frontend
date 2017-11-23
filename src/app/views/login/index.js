import {h, Component} from 'preact'
import {Link} from 'react-router-dom'

import LoginForm from './login-form'
import Footer from '../shared/footer'

import style from './styles.scss'
import '../shared/paper/paper.scss'

import locale from 'locale'

const viewStrings = locale.login

export default class Login extends Component {
  render () {
    return (
      <div class={`${style.login} flex flex-full-center flex-dc`}>
        <div class='paper paper-small paper-padding flex flex-dc flex-full-center'>
          <h1 class='ta-c'>{viewStrings.title}</h1>
          <LoginForm />
          <div class={`${style.loginAltLinks} flex flex-cross-center flex-sb`}>
            <a href='mailto:admin@domain.com' rel='noopener'>{viewStrings.forgot_password}</a>
            <Link to='/register' rel='noopener'>{viewStrings.not_registered}</Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
