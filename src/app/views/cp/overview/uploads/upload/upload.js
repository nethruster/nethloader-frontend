import { h, Component } from 'preact'

import Button from '../../../../shared/button/button.js'

import style from './upload.scss'

export default class Upload extends Component {
  render () {
    return (
      <li class={`${style.upload} flex flex-cross-center flex-sb`}>
        <div class={`${style.uploadImage} flex flex-full-center`}><img src='imageurl' /></div>
        <div class={`${style.uploadDataSpec} flex flex-dc`}><p><span>ID:</span> 14vWW533HC</p> <p><span>Type:</span> jpg</p></div>
        <div class={`${style.uploadDataDate} flex flex-dc`}><p><span>Uploaded:</span> 2017-10-15</p> <p><span>At:</span> 21:58</p></div>
        <div class={`${style.uploadButtons} flex flex-dc flex-sa`}><Button small text='Download' icon='download' customClass={style.uploadButtonsButton} /><Button small icon='copy' text='Copy url' customClass={style.uploadButtonsButton} /></div>
      </li>
    )
  }
}
