import { h, Component } from 'preact'

import Uploads from './uploads/uploads.js'

import style from './overview.scss'

export default class Overview extends Component {
  render () {
    return (
      <div class={`${style.overview} flex`}>
        <Uploads />
        <div class={style.sidebar}>
          Search
        </div>
      </div>
    )
  }
}
