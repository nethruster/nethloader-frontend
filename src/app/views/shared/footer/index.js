import {h} from 'preact'
import {NavLink} from 'react-router-dom'

import Icon from '../icon'

import { version } from 'app.config'

import style from './styles.scss'

import locale from 'locale'
const viewStrings = locale.footer

export default function Footer ({contentFooter}) {
  return (
    <footer class={`${style.footer} ${contentFooter ? style.footerContent : ''}`}>
      <p class='flex flex-full-center'><a href='https://github.com/nethruster/nethloader' target='_blank' rel='noopener'>{viewStrings.powered_by} Nethloader v{version}</a> &nbsp;&nbsp;&nbsp;&nbsp;<span><Icon iconName='twitter' />&nbsp;<a href='https://twitter.com/nethruster' rel='noopener' target='_blank'>@nethruster</a></span>&nbsp;&nbsp;&nbsp;&nbsp;<NavLink to='/cp' activeClassName='dom-hidden'>Login/CP</NavLink></p>
    </footer>
  )
}
