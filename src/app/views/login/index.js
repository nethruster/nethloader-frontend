import {h} from 'preact'
import {Link} from 'react-router-dom'
import {Snackbar} from 'react-redux-snackbar'

import LoginForm from './login-form'
import Footer from '../shared/footer'

import style from './styles.scss'
import '../shared/paper/paper.scss'

const viewStrings = locale.login // eslint-disable-line no-undef

const snackStyles = {
  snack: {
    padding: '16px',
    border: 'none'
  },
  button: {
    color: '#f2f2f2',
    cursor: 'pointer'
  },
  'span': {
    fontSize: '1em',
    letterSpacing: '.5px',
    fontWeight: '300'
  }
}

export default function Login () {
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
      <Snackbar customStyles={snackStyles} />
    </div>
  )
}
