import { h, Component } from 'preact'
import { Link } from 'react-router-dom'

import Button from '../../../../shared/button/button.js'
import Icon from '../../../../shared/icon/icon.js'

import AsyncMedia from 'asyncMedia'
import { baseMediaPath } from 'app.config'
import { copyToClipboard, computeDateFormat, computeDate, computeTime } from 'utils'

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
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
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
    }, 1500)
  }

  handleDeleteClick () {
    this.props.deleteMedia(this.uploadEl)
  }

  render () {
    const mediaPath = `${baseMediaPath}${this.props.data.id}.${this.props.data.extension}`
    const mediaUrl = `/${this.props.data.id}`
    return (
      <li class={`${style.upload} flex flex-cross-center flex-sb`} data-id={this.props.data.id} ref={(el) => { this.uploadEl = el }}>
        <div class={`${style.uploadMedia} flex flex-full-center`} title='Click to open'><Link target='_blank' rel='noopener' to={mediaUrl} class='flex flex-full-center'><AsyncMedia src={mediaPath} type={this.props.data.extension} size='74' id={this.props.data.id} /></Link></div>
        <div class={`${style.uploadDataSpec} flex flex-dc`}><p><span>ID:</span> {this.props.data.id}</p> <p><span>{viewStrings.type}:</span> {this.props.data.extension}</p></div>
        <div class={`${style.uploadDataDate} flex flex-dc`} title={computeDateFormat(this.props.data.createdAt)}><small>{computeDateFormat(this.props.data.createdAt)}</small><p><span>{viewStrings.uploaded}:</span> {computeDate(this.props.data.createdAt)}</p> <p><span>{viewStrings.at}:</span> {computeTime(this.props.data.createdAt)}</p></div>
        <div class={`${style.uploadButtons} flex flex-dc flex-sa`}><a href={mediaPath} download><Button small text={viewStrings.download} icon='download' customClass={style.uploadButtonsButton} /></a><a><Button small icon='copy' text={this.state.copy.valueCopied ? 'COPIED!' : viewStrings.copy_url} copyText={`${window.location.origin}${mediaUrl}`} onClickExecute={this.handleCopyClick} customClass={style.uploadButtonsButton} /></a></div>
        <div class={`${style.uploadDeleteButton} flex flex-full-center`} onClick={this.handleDeleteClick}><Icon iconName='delete' iconColor='#e53935' /></div>
      </li>
    )
  }
}
