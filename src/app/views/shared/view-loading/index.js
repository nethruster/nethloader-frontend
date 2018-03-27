import { h } from 'preact'

import Spinner from './../spinner'

import style from './styles.scss'

export default function ViewLoading () {
  return (
    <div class={`${style.loading}`}>
      <Spinner />
    </div>
  )
}
