import {h} from 'preact'
import {NavLink} from 'react-router-dom'

import Icon from '../icon'

import style from './styles.scss'

import version from 'version'

const viewStrings = locale.footer // eslint-disable-line no-undef

export default function Footer ({contentFooter}) {
  return (
    <footer class={`${style.footer} ${contentFooter ? style.footerContent : ''}`}>
      <span class='flex flex-full-center'>
        <a class='flex flex-full-center' href='https://github.com/nethruster/nethloader' target='_blank' rel='noopener'>
          <Icon iconName='github' />&nbsp;<p>{viewStrings.powered_by}&nbsp;Nethloader v{version}</p>
        </a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a class={`flex flex-full-center ${style.twitter}`} href='https://twitter.com/nethruster' rel='noopener' target='_blank'>
          <Icon iconName='twitter' />&nbsp;<p>nethruster</p>
        </a>&nbsp;&nbsp;&nbsp;&nbsp;
        <NavLink to='/cp' activeClassName='dom-hidden'>Login/CP</NavLink>
      </span>
    </footer>
  )
}
