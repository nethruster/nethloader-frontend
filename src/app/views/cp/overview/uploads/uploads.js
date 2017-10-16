import { h, Component } from 'preact'

import Upload from './upload/upload.js'

import style from './uploads.scss'

export default class Uploads extends Component {
  render () {
    return (
      <div class={style.uploads}>
        <ul>
          <Upload />
        </ul>
      </div>
    )
  }
}
