import {h, Component} from 'preact'
import {NavLink} from 'react-router-dom'

import Icon from '../icon'

import { version } from 'app.config'

import style from './styles.scss'

export default class Footer extends Component {
  render ({contentFooter}) {
    return (
      <footer class={`${style.footer} ${contentFooter ? style.footerContent : ''}`}>
        <p class='flex flex-full-center'><a href='https://github.com/nethruster/nethloader' target='_blank' rel='noopener'>Powered by Nethloader v{version}</a> &nbsp;&nbsp;&nbsp;&nbsp;<span><Icon iconName='twitter' />&nbsp;<a href='https://twitter.com/nethruster' rel='noopener' target='_blank'>@nethruster</a></span>&nbsp;&nbsp;&nbsp;&nbsp;<NavLink to='/cp' activeClassName='dom-hidden'>Login/CP</NavLink></p>
      </footer>
    )
  }
}
