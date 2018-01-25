import {h} from 'preact'

import UsersPartial from './users'

import style from './styles.scss'

export default function () {
  return (
    <div class={`flex ${style.cpadmin}`}>
      <UsersPartial />
    </div>
  )
}
