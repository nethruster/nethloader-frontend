import { h, Component } from 'preact'

import Uploads from './uploads'

import style from './styles.scss'

export default class Overview extends Component {
  render () {
    return (
      <div class={`${style.overview} flex`}>
        <Uploads />
      </div>
    )
  }
}
