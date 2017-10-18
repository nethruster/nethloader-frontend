import { h, Component } from 'preact'

import Button from '../button/button.js'

import style from './header-nav.scss'

export default class HeaderNav extends Component {
  render () {
    return (
      <header class={`${style.headerNav} flex flex-cross-center flex-sb`} role='menubar'>
        <div class={`${style.headerNavLogo} flex`}>
          <img src='../../../../assets/img/logo.svg' alt='Nethloader Logo' />
          <p class={`${style.headerNavLogoTitle} flex flex-full-center`}>Nethloader</p>
        </div>
        <div>
          <Button text='About Nethloader' navButton />
        </div>
      </header>
    )
  }
}
