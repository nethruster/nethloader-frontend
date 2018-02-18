import {h} from 'preact'
import {Snackbar} from 'react-redux-snackbar'
import {Link} from 'react-router-dom'

import RegisterForm from './register-form'
import Footer from '../shared/footer'
import locale from 'locale'

import style from './styles.scss'
import '../shared/paper/paper.scss'

const viewStrings = locale.register

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

export default function Register () {
  return (
    <div class={`${style.register} flex flex-full-center flex-dc`}>
      <div class='paper paper-small paper-padding flex flex-dc flex-full-center'>
        <h1 class='ta-c'>{viewStrings.title}</h1>
        <RegisterForm />
        <div class={`${style.registerAltLinks} flex flex-full-center`}>
          <Link to='/login'>{viewStrings.has_account}</Link>
        </div>
      </div>
      <Snackbar customStyles={snackStyles} />
      <Footer />
    </div>
  )
}
