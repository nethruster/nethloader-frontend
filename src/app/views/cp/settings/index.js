import {h, Component} from 'preact'

import style from './styles.scss'

export default class Settings extends Component {
  render () {
    return (
      <div class={`${style.settings} flex flex-dc`}>
        <p>Settings</p>
      </div>
    )
  }
}
