import { h, Component } from 'preact'

import Spinner from './../spinner'

import style from './styles.scss'

export default class ViewLoading extends Component {
  render () {
    return (
      <div class={`${style.loading}`}>
        <Spinner />
      </div>
    )
  }
}
