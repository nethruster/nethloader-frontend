import { h, Component } from 'preact'
import { Link } from 'react-router-dom'

import { adminEmail } from 'app.config'

import style from './styles.scss'

export default class NotFound extends Component {
  render () {
    return (
      <div class={`flex flex-full-center flex-dc ${style.notFound}`}>
        <p class='nomedia flex flex-full-center flex-dc'>
          <picture>
            <source src='./assets/img/sorry.webp' />
            <source src='./assets/img/sorry.gif' />
            <img src='./assets/img/sorry.gif' />
          </picture>
          <span class='flex flex-full-center'>Sorry, we couldn't find that...</span>
          <small>
            If something should be here, <a href={`mailto:${adminEmail}`}>contact with an administrator</a> or <Link to='/cp/overview'>go back to the control panel.</Link>
          </small>
        </p>
      </div>
    )
  }
}
