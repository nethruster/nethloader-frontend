import { h, Component } from 'preact'
import { Link } from 'react-router-dom'

import DropDownMenu from '../../../../../shared/dropdown-menu'
import Button from '../../../../../shared/button'
import Checkbox from '../../../../../shared/checkbox'
import locale from 'locale'
import { copyToClipboard } from 'utils'

import style from './styles.scss'

const viewStrings = locale.cp.overview.uploads.upload

export default class Upload extends Component {
  constructor (props) {
    super(props)

    this.state = {
      copy: { valueCopied: false }
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
    this.setState({ copy })

    setTimeout(() => {
      copy.valueCopied = false
      this.setState({ copy })
    }, 1500)
  }

  handleDeleteClick (event) {
    if (!this.props.isSelected) { this.props.handleToggleSelect(event) }
    this.props.toggleDeleteConfirmModal()
  }

  render ({ data, isSelected, handleToggleSelect, selectMode, mediaPath, mediaUrl }) {
    return (
      <div class='flex flex-full-center'>
        {
          this.props.selectMode
            ? <Checkbox onChangeHandler={handleToggleSelect} isSelected={isSelected} dataId={data.id} customClass={style.selectButton} />
            : (
              <Link target='_blank' rel='noopener' to={mediaUrl} class='flex flex-full-center' title={viewStrings.click_open} tabindex='-2'>
                <Button iconButton icon='open-in-new' />
              </Link>
            )
        }

        <DropDownMenu>
          <li><a href={mediaPath} download><Button text={viewStrings.download} icon='download' dropdown /></a></li>
          <li><Button icon='copy' text={this.state.copy.valueCopied ? viewStrings.copied : viewStrings.copy_url} copyText={`${mediaUrl}`} onClickExecute={this.handleCopyClick} dropdown /></li>
          <li><Button dataId={data.id} text='Delete' icon='delete' dropdown onClickExecute={this.handleDeleteClick} disabled={selectMode} /></li>
        </DropDownMenu>
      </div>
    )
  }
}
