import { h, Component } from 'preact'
import { Link } from 'react-router-dom'

import Button from '../../../../shared/button/button.js'

import AsyncMedia from 'asyncMedia'
import {baseMediaPath} from 'app.config'
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
    const mediaPath = `${baseMediaPath}${this.props.id}.${this.props.type}`
    const mediaUrl = `/${this.props.id}`
    return (
      <li class={`${style.upload} flex flex-cross-center flex-sb`} data-id={this.props.id}>
        <div class={`${style.uploadMedia} flex flex-full-center`} title='Click to open'><Link target='_blank' rel='noopener' to={mediaUrl} class='flex flex-full-center'><AsyncMedia src={mediaPath} type={this.props.type} size='74' /></Link></div>
        <div class={`${style.uploadDataSpec} flex flex-dc`}><p><span>ID:</span> {this.props.id}</p> <p><span>{viewStrings.type}:</span> {this.props.type}</p></div>
        <div class={`${style.uploadDataDate} flex flex-dc`} title={computeDateFormat(this.props.upDate)}><small>{computeDateFormat(this.props.upDate)}</small><p><span>{viewStrings.uploaded}:</span> {computeDate(this.props.upDate)}</p> <p><span>{viewStrings.at}:</span> {computeTime(this.props.upDate)}</p></div>
        <div class={`${style.uploadButtons} flex flex-dc flex-sa`}><a href={mediaPath} download><Button small text={viewStrings.download} icon='download' customClass={style.uploadButtonsButton} /></a><a><Button small icon='copy' text={this.state.copy.valueCopied ? 'COPIED!' : viewStrings.copy_url} copyText={mediaUrl} onClickExecute={this.handleCopyClick} customClass={style.uploadButtonsButton} /></a></div>
      </li>
    )
  }
}
