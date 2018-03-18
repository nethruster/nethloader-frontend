import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import DropDownMenu from '../../../../../shared/dropdown-menu'
import Button from '../../../../../shared/button'
import Checkbox from '../../../../../shared/checkbox'
import {copyToClipboard} from 'utils'
import {mediaUnselectAll} from 'actions/media'
import {baseMediaPath} from 'app.config'

import style from './styles.scss'

const viewStrings = locale.cp.overview.uploads.upload // eslint-disable-line no-undef

const mapStateToProps = (state) => {
  const {selectedMedia} = state.mediaSelect

  return {selectedMedia}
}

export default connect(mapStateToProps)(class UploadButtons extends Component {
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

    let copy = {...this.state.copy}

    copy.valueCopied = true
    this.setState({copy})

    setTimeout(() => {
      copy.valueCopied = false
      this.setState({copy})
    }, 1500)
  }

  async handleDeleteClick (event) {
    await this.props.dispatch(mediaUnselectAll())
    this.props.handleToggleSelect(event)
    this.props.toggleDeleteConfirmModal()
  }

  render ({data, handleToggleSelect, selectedMedia}) {
    const mediaPath = `${baseMediaPath}${data.id}.${data.extension}`
    const mediaUrl = `${document.location.origin}/${data.id}`

    return (
      <div class='flex flex-full-center'>
        <Checkbox
          onChangeHandler={handleToggleSelect}
          isSelected={selectedMedia.includes(data.id)}
          dataId={data.id}
          customClass={style.selectButton}
        />
        <DropDownMenu>
          <li>
            <a href={mediaPath}
              download>
              <Button
                text={viewStrings.download}
                icon='download'
                dropdown
              />
            </a>
          </li>
          <li>
            <Button
              icon='copy'
              text={this.state.copy.valueCopied
                ? viewStrings.copied
                : viewStrings.copy_url}
              copyText={mediaUrl}
              onClickExecute={this.handleCopyClick}
              dropdown
            />
          </li>
          <li>
            <Button
              dataId={data.id}
              text={viewStrings.delete}
              icon='delete'
              dropdown
              onClickExecute={this.handleDeleteClick}
            />
          </li>
        </DropDownMenu>
      </div>
    )
  }
})
