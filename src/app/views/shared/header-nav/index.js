import {h, Component} from 'preact'
import {Link} from 'react-router-dom'

import HeaderNav from './nav'

import style from './styles.scss'

export default class Header extends Component {
  render () {
    return (
      <header class={`${style.headerNav} flex flex-cross-center flex-sb`} role='menubar'>
        <Link to='/cp'>
          <div class={`${style.headerNavLogo} flex`}>
            <img src='../../../../assets/img/logo.svg' alt='Nethloader Logo' />
            <p class={`${style.headerNavLogoTitle} flex flex-full-center`}>Nethloader</p>
          </div>
        </Link>
        <HeaderNav />
      </header>
    )
  }
}
