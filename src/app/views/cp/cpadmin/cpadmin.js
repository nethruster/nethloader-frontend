import { h, Component } from 'preact'

import style from './cpadmin.scss'

export default class CPAdmin extends Component {
  render () {
    return (
      <div class={`${style.cpadmin} flex flex-dc`}>
        <p>Admin CP</p>
      </div>
    )
  }
}