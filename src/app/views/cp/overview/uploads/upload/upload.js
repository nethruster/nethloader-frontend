import { h, Component } from 'preact'
import { Link } from 'react-router-dom'

import Button from '../../../../shared/button/button.js'

import AsyncMedia from 'asyncMedia'
import { pad } from 'utils'

import style from './upload.scss'

import locale from 'locale'

const viewStrings = locale.cp.overview.uploads.upload

export default class Upload extends Component {
  computeDate () {
    let date = new Date(this.props.upDate)

    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`
  }

  computeTime () {
    let date = new Date(this.props.upDate)

    return `${pad(date.getHours())}:${pad(date.getMinutes())}`
  }

  render () {
    const testImage = 'https://images.unsplash.com/photo-1484199408980-5918a796a53f?dpr=1&auto=format&fit=crop&w=1373&q=60&cs=tinysrgb'
    return (
      <li class={`${style.upload} flex flex-cross-center flex-sb`} data-id={this.props.id}>
        <div class={`${style.uploadImage} flex flex-full-center`}><Link target='_blank' rel='noopener' to={`/${this.props.id}`}><AsyncMedia src={testImage} /></Link></div>
        <div class={`${style.uploadDataSpec} flex flex-dc`}><p><span>ID:</span> {this.props.id}</p> <p><span>{viewStrings.type}:</span> {this.props.type}</p></div>
        <div class={`${style.uploadDataDate} flex flex-dc`} title='DD-MM-YYYY - GMT+02'><p><span>{viewStrings.uploaded}:</span> {this.computeDate()}</p> <p><span>{viewStrings.at}:</span> {this.computeTime()}</p></div>
        <div class={`${style.uploadButtons} flex flex-dc flex-sa`}><a href={testImage} download><Button small text={viewStrings.download} icon='download' customClass={style.uploadButtonsButton} /></a><a><Button small icon='copy' text={viewStrings.copy_url} customClass={style.uploadButtonsButton} /></a></div>
      </li>
    )
  }
}
