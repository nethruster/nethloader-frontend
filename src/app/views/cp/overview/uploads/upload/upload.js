import { h, Component } from 'preact'

import Button from '../../../../shared/button/button.js'

import style from './upload.scss'

import locale from 'locale'

const viewStrings = locale.cp.overview.uploads.upload

export default class Upload extends Component {
  render () {
    const testImage = 'https://images.unsplash.com/photo-1484199408980-5918a796a53f?dpr=1&auto=format&fit=crop&w=1373&q=60&cs=tinysrgb'
    return (
      <li class={`${style.upload} flex flex-cross-center flex-sb`}>
        <div class={`${style.uploadImage} flex flex-full-center`}><img src={testImage} /></div>
        <div class={`${style.uploadDataSpec} flex flex-dc`}><p><span>ID:</span> 14vWW533HC</p> <p><span>{viewStrings.type}:</span> jpg</p></div>
        <div class={`${style.uploadDataDate} flex flex-dc`}><p><span>{viewStrings.uploaded}:</span> 2017-10-15</p> <p><span>{viewStrings.at}:</span> 21:58</p></div>
        <div class={`${style.uploadButtons} flex flex-dc flex-sa`}><a href={testImage} download><Button small text={viewStrings.download} icon='download' customClass={style.uploadButtonsButton} /></a><a><Button small icon='copy' text={viewStrings.copy_url} customClass={style.uploadButtonsButton} /></a></div>
      </li>
    )
  }
}
