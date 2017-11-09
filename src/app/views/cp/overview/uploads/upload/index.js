import { h, Component } from 'preact'
import { Link } from 'react-router-dom'

import DropDownMenu from '../../../../shared/dropdown-menu/'
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

  handleDeleteClick (event) {
    if (!this.props.isSelected) { this.props.handleToggleSelect(event) }
    this.props.toggleDeleteConfirmModal()
  }

  render ({data, isSelected, handleToggleSelect}) {
    const mediaPath = `${baseMediaPath}${data.id}.${data.extension}`
    const mediaUrl = `${document.location.origin}/${data.id}`
    return (
      <li class={`${style.upload} flex flex-cross-center flex-sb`} ref={(el) => { this.uploadEl = el }}>
        <div class={`${style.uploadMedia} flex flex-full-center`}>
          <AsyncMedia src={mediaPath} type={data.extension} size='74' id={data.id} />
        </div>

        <div class={`${style.uploadDataSpec} flex flex-dc`}>
          <p><span>ID:</span> {data.id}</p> <p><span>{viewStrings.type}:</span> {data.extension}</p>
        </div>

        <div class={`${style.uploadDataDate} flex flex-dc`} title={computeDateFormat(data.createdAt)}>
          <small>{computeDateFormat(data.createdAt)}</small>
          <p><span>{viewStrings.uploaded}:</span> {computeDate(data.createdAt)}<br />{computeTime(data.createdAt)}</p>
        </div>

        <DropDownMenu>
          <li><a href={mediaPath} download><Button text={viewStrings.download} icon='download' dropdown /></a></li>
          <li><Button icon='copy' text={this.state.copy.valueCopied ? viewStrings.copied : viewStrings.copy_url} copyText={`${mediaUrl}`} onClickExecute={this.handleCopyClick} dropdown /></li>
          <li><Button id={data.id} text='Delete' icon='delete' dropdown onClickExecute={this.handleDeleteClick} /></li>
        </DropDownMenu>
        {
          this.props.selectMode
            ? <Checkbox onChangeHandler={handleToggleSelect} isSelected={isSelected} id={data.id} customClass={style.uploadSelectButton} />
            : (
              <Link target='_blank' rel='noopener' to={mediaUrl} class='flex flex-full-center' title={viewStrings.click_open}>
                <div class={`${style.uploadOpenButton} flex flex-full-center`}>
                  <Icon iconName='open-in-new' />
                </div>
              </Link>
            )
        }
      </li>
    )
  }
}
