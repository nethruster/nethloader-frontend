import { h, Component } from 'preact'
import { NavLink } from 'react-router-dom'

import Icon from '../icon/icon.js'

import { version } from 'app.config'

import style from './footer.scss'

import locale from 'locale'

const viewStrings = locale.footer

export default class Home extends Component {
  render () {
    return (
      <footer class={`${style.footer}`}>
        <p class='flex flex-full-center'>{viewStrings.version} { version } &nbsp;&nbsp;&nbsp;&nbsp;<Icon iconName='twitter' />&nbsp;<a href='https://twitter.com/nethruster' rel='noopener' target='_blank'>@nethruster</a>&nbsp;&nbsp;&nbsp;&nbsp;<NavLink to='/login' activeClassName='dom-hidden' >{viewStrings.login}</NavLink></p>
      </footer>
    )
  }
}
