import { h, Component } from 'preact'

import { Link } from 'react-router-dom'

import RegisterForm from './register-form/register-form.js'
import Footer from '../shared/footer/footer.js'

import style from './register.scss'
import '../shared/paper/paper.scss'

export default class Register extends Component {
  render () {
    return (
      <div class={`${style.register} flex flex-full-center flex-dc`}>
        <div class='paper paper-small paper-padding flex flex-dc flex-full-center'>
          <h1 class='ta-c'>Create an account</h1>
          <RegisterForm />
          <div class={`${style.registerAltLinks} flex flex-full-center`}>
            <Link to='/login'>I already have an account</Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
