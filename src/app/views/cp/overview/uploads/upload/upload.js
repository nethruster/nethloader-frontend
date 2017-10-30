import { h, Component } from 'preact'
import { Link } from 'react-router-dom'

import Button from '../../../../shared/button/button.js'

import AsyncMedia from 'asyncMedia'
import { pad, copyToClipboard } from 'utils'

import style from './upload.scss'

import locale from 'locale'

const viewStrings = locale.cp.overview.uploads.upload

export default class Upload extends Component {
  constructor (props) {
    super(props)

    this.state = {
      copy: {valueCopied: false}
    }

    this.handleCopyClick = this.handleCopyClick.bind(this)
  }

  computeDate () {
    let date = new Date(this.props.upDate)

    // Note: We add 1 to the month because months are counted from 0
    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`
  }

  computeTime () {
    let date = new Date(this.props.upDate)

    return `${pad(date.getHours())}:${pad(date.getMinutes())}`
  }

  computeFormat () {
    let date = new Date(this.props.upDate)

    return `DD/MM/YYY GMT${date.getTimezoneOffset() / 60}`
  }

  handleCopyClick (event) {
    copyToClipboard(event)

    let copy = {
      ...this.state.copy
    }

    copy.valueCopied = true
    this.setState({copy})

    setTimeout(() => {
      copy.valueCopied = false
      this.setState({copy})
    }, 2000)
  }

  render () {
    const imagePath = `http://localhost:4000/media/${this.props.id}.${this.props.type}`
    const imageUrl = `${window.location.origin}/${this.props.id}`
    return (
      <li class={`${style.upload} flex flex-cross-center flex-sb`} data-id={this.props.id}>
        <div class={`${style.uploadImage} flex flex-full-center`} title='Click to open'><Link target='_blank' rel='noopener' to={`/${this.props.id}`}><AsyncMedia src={imagePath} /></Link></div>
        <div class={`${style.uploadDataSpec} flex flex-dc`}><p><span>ID:</span> {this.props.id}</p> <p><span>{viewStrings.type}:</span> {this.props.type}</p></div>
        <div class={`${style.uploadDataDate} flex flex-dc`} title={this.computeFormat()}><small>{this.computeFormat()}</small><p><span>{viewStrings.uploaded}:</span> {this.computeDate()}</p> <p><span>{viewStrings.at}:</span> {this.computeTime()}</p></div>
        <div class={`${style.uploadButtons} flex flex-dc flex-sa`}><a href={imagePath} download><Button small text={viewStrings.download} icon='download' customClass={style.uploadButtonsButton} /></a><a><Button small icon='copy' text={this.state.copy.valueCopied ? 'COPIED!' : viewStrings.copy_url} copyText={imageUrl} onClickExecute={this.handleCopyClick} customClass={style.uploadButtonsButton} /></a></div>
      </li>
    )
  }
}
