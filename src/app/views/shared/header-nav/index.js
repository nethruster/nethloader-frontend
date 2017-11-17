import { h, Component } from 'preact'

import HeaderNav from './nav'

import style from './styles.scss'

export default class Header extends Component {
  render () {
    return (
      <header class={`${style.headerNav} flex flex-cross-center flex-sb`} role='menubar'>
        <div class={`${style.headerNavLogo} flex`}>
          <img src='../../../../assets/img/logo.svg' alt='Nethloader Logo' />
          <p class={`${style.headerNavLogoTitle} flex flex-full-center`}>Nethloader</p>
        </div>
        <HeaderNav />
      </header>
    )
  }
}
