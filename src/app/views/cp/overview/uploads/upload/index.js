import { h, Component } from 'preact'
import { Link } from 'react-router-dom'

import Button from '../../../../shared/button/'
import Icon from '../../../../shared/icon/'
import Checkbox from '../../../../shared/checkbox'
import AsyncMedia from 'asyncMedia'

import locale from 'locale'
import { baseMediaPath } from 'app.config'
import { copyToClipboard, computeDateFormat, computeDate, computeTime } from 'utils'

import style from './styles.scss'

const viewStrings = locale.cp.overview.uploads.upload

export default class Upload extends Component {
  constructor (props) {
    super(props)

    this.state = {
      copy: {valueCopied: false},
      isSelected: false
    }

    this.handleCopyClick = this.handleCopyClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.toggleSelect = this.toggleSelect.bind(this)
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

  toggleSelect () {
    this.setState({isSelected: !this.state.isSelected})
    this.props.handleToggleSelect(this.props.data.id, this.state.isSelected)
  }

  render ({data}) {
    const mediaPath = `${baseMediaPath}${data.id}.${data.extension}`
    const mediaUrl = `/${data.id}`
    return (
      <li class={`${style.upload} ${this.state.isSelected ? style.uploadSelected : ''} flex flex-cross-center flex-sb`} data-id={data.id} ref={(el) => { this.uploadEl = el }}>
        <div class={`${style.uploadMedia} flex flex-full-center`} title={viewStrings.click_open}><Link target='_blank' rel='noopener' to={mediaUrl} class='flex flex-full-center'><AsyncMedia src={mediaPath} type={data.extension} size='74' id={data.id} /></Link></div>
        <div class={`${style.uploadDataSpec} flex flex-dc`}><p><span>ID:</span> {data.id}</p> <p><span>{viewStrings.type}:</span> {data.extension}</p></div>
        <div class={`${style.uploadDataDate} flex flex-dc`} title={computeDateFormat(data.createdAt)}><small>{computeDateFormat(data.createdAt)}</small><p><span>{viewStrings.uploaded}:</span> {computeDate(data.createdAt)}</p> <p><span>{viewStrings.at}:</span> {computeTime(data.createdAt)}</p></div>
        <div class={`${style.uploadButtons} flex flex-dc flex-sa`}><a href={mediaPath} download><Button small text={viewStrings.download} icon='download' customClass={style.uploadButtonsButton} /></a><a><Button small icon='copy' text={this.state.copy.valueCopied ? viewStrings.copied : viewStrings.copy_url} copyText={`${window.location.origin}${mediaUrl}`} onClickExecute={this.handleCopyClick} customClass={style.uploadButtonsButton} /></a></div>
        {
          this.props.selectMode

        ? <Checkbox toggleSelect={this.toggleSelect} isSelected={this.state.isSelected} id={data.id} customClass={style.uploadSelectButton} />
        : (
          <div class={`${style.uploadDeleteButton} flex flex-full-center`} onClick={this.handleDeleteClick}>
            <Icon iconName='delete' iconColor='#e53935' />
          </div>
        )
        }
      </li>
    )
  }
}
