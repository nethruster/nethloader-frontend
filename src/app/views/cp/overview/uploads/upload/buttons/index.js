import { h, Component } from 'preact'
import {connect} from 'preact-redux'

import DropDownMenu from '../../../../../shared/dropdown-menu'
import Button from '../../../../../shared/button'
import Checkbox from '../../../../../shared/checkbox'
import locale from 'locale'
import { copyToClipboard } from 'utils'
import { mediaUnselectAll } from 'actions/media'

import style from './styles.scss'

const viewStrings = locale.cp.overview.uploads.upload

export default connect()(class Upload extends Component {
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
    this.props.dispatch(mediaUnselectAll())
    if (!this.props.isSelected) { this.props.handleToggleSelect(event) }
    this.props.toggleDeleteConfirmModal()
  }

  render ({ data, isSelected, handleToggleSelect, mediaPath, mediaUrl, dispatch }) {
    return (
      <div class='flex flex-full-center'>
        <Checkbox onChangeHandler={handleToggleSelect} isSelected={isSelected} dataId={data.id} customClass={style.selectButton} />
        <DropDownMenu>
          <li><a href={mediaPath} download><Button text={viewStrings.download} icon='download' dropdown /></a></li>
          <li><Button icon='copy' text={this.state.copy.valueCopied ? viewStrings.copied : viewStrings.copy_url} copyText={`${mediaUrl}`} onClickExecute={this.handleCopyClick} dropdown /></li>
          <li><Button dataId={data.id} text='Delete' icon='delete' dropdown onClickExecute={this.handleDeleteClick} /></li>
        </DropDownMenu>
      </div>
    )
  }
})