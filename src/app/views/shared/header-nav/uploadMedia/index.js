import {h, Component} from 'preact'
import {withRouter} from 'react-router-dom'
import {connect} from 'preact-redux'
import {showSnack} from 'react-redux-snackbar'
import Ink from 'react-ink'

import Button from '../../button'
import Modal from '../../modal'
import Icon from '../../icon'
import {isValidFormat, getPageFactor, supportedExtensions} from 'utils'
import {uploadMedia, getMediaInfo} from 'serverAPI/media'
import {scrollBlockOn, scrollBlockOff} from 'preventScroll'
import locale from 'locale'

import style from './styles.scss'

const viewStrings = locale.shared.upload_media

function mapStateToProps (state) {
  const {token, sessionData} = state.authentication
  const {params} = state.userMedia
  const {isFetchingUser, strData} = state.userData

  return {
    token,
    sessionData,
    params,
    isFetchingUser,
    strData
  }
}

export default withRouter(connect(mapStateToProps)(class UploadMedia extends Component {
  constructor (props, context) {
    super(props)

    this.state = {
      modals: {
        upload: {
          isActive: false,
          selectedFiles: [],
          files: [],
          isUploading: false,
          uploadedFileCount: 0
        }
      }
    }

    this.toggleUploadModal = this.toggleUploadModal.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.handleUploadSubmit = this.handleUploadSubmit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.toggleIsUploading = this.toggleIsUploading.bind(this)
    this.handleFileDrop = this.handleFileDrop.bind(this)

    this.pageFactor = getPageFactor(context.router)
  }

  componentDidMount () {
    document.addEventListener('dragover', this.onDragOver)
    document.addEventListener('drop', this.handleFileDrop)
  }

  // Utility methods
  increaseUploadedFileCount () {
    let modals = {
      ...this.state.modals
    }

    modals.upload.uploadedFileCount++

    this.setState({modals})
  }

  toggleUploadModal () {
    if (!this.state.modals.upload.isUploading) {
      let modals = {
        ...this.state.modals
      }

      modals.upload.isActive ? scrollBlockOff() : scrollBlockOn()

      modals.upload.isActive = !modals.upload.isActive

      this.setState({modals})
    }
  }

  resetForm (event) {
    let modals = {
      ...this.state.modals
    }

    event.target.reset()
    modals.upload.files = []
    modals.upload.selectedFiles = []
    modals.upload.uploadedFileCount = 0

    this.setState({modals})
  }

  toggleIsUploading () {
    let modals = {
      ...this.state.modals
    }

    modals.upload.isUploading = !modals.upload.isUploading

    this.setState({modals})
  }

  // Traditional file input methods
  handleUploadSubmit (event) {
    event.preventDefault()

    let filesToUpload = this.state.modals.upload.files
    if (filesToUpload.length <= 0) {
      console.log(viewStrings.response.no_files)
    } else if (filesToUpload.length > 0) {
      this.toggleIsUploading()

      for (let file of filesToUpload) {
        try {
          this.props.dispatch(uploadMedia(file, this.props.token)).then((imageId) => {
            this.increaseUploadedFileCount()

            if (this.state.modals.upload.uploadedFileCount === this.state.modals.upload.selectedFiles.length) {
              let fileCount = this.state.modals.upload.uploadedFileCount
              this.resetForm(event)
              this.toggleIsUploading()
              this.toggleUploadModal()

              if (fileCount === 1) {
                this.props.dispatch(getMediaInfo(imageId)).then(response => {
                  this.props.history.push(`/${response.id}`)
                }).catch(() => {
                  this.context.router.history.push('/404')
                })
              } else {
                let newParams = this.props.params

                newParams.offset = this.pageFactor * newParams.mediaLimit

                this.props.history.push('/cp/overview')
              }
            }
          })
        } catch (err) {
          console.log(err)
        }
      }
    } else {
      console.log(viewStrings.response.error)
    }
  }

  handleFileChange (event) {
    let validFilesCount = 0

    let modals = {
      ...this.state.modals
    }

    for (let file of event.target.files) {
      if (isValidFormat(file.name.split('.').pop())) { // Get the extension part from the name
        validFilesCount++
        modals.upload.files.push(file)
        modals.upload.selectedFiles.push(file.name)
      } else {
        this.props.dispatch(showSnack('invalidFileClick', {
          label: 'Invalid files detected',
          timeout: 3000,
          button: { label: 'OK' }
        }))
        console.log(`${viewStrings.invalid_file_detected}: ` + file.name)
      }
    }

    this.props.dispatch(showSnack('addedFilesClick', {
      label: `Added ${validFilesCount} ${validFilesCount === 1 ? 'file' : 'files'}`,
      timeout: 3000,
      button: { label: 'OK' }
    }))

    this.setState({modals})
  }

  // Drag & drop methods
  onDragOver (event) {
    // Prevent browser loading image
    event.preventDefault()
  }

  handleFileDrop (event) {
    event.preventDefault()

    if (event.dataTransfer.files.length > 0) {
      let validFilesCount = 0

      let modals = {
        ...this.state.modals
      }

      if (!modals.upload.isActive) {
        this.toggleUploadModal()
      }

      for (let file of event.dataTransfer.files) {
        if (isValidFormat(file.name.split('.').pop())) {
          validFilesCount++
          modals.upload.files.push(file)
          modals.upload.selectedFiles.push(file.name)
        } else {
          this.props.dispatch(showSnack('invalidFileDrop', {
            label: 'Invalid files detected',
            timeout: 3000,
            button: { label: 'OK' }
          }))
          console.log(`${viewStrings.invalid_file_detected}: ` + file.name)
        }
      }

      this.props.dispatch(showSnack('addedFilesDrop', {
        label: `Added ${validFilesCount} ${validFilesCount === 1 ? 'file' : 'files'}`,
        timeout: 3000,
        button: { label: 'OK' }
      }))

      this.setState({modals})
    }
  }

  render ({dispatch, isAuthenticated, token, isFetchingUser, strData}) {
    return (
      <span>
        <Button
          text={viewStrings.trigger_button}
          icon='upload'
          navButton
          onClickExecute={this.toggleUploadModal}
        />
        <Modal
          isActive={this.state.modals.upload.isActive}
          toggleModal={this.toggleUploadModal}
          disabled={this.state.modals.upload.isUploading}>
          <div>
            <form
              onSubmit={this.handleUploadSubmit}
              class={`${style.uploadForm} flex flex-dc flex-full-center`}>
              <input
                type='file'
                id='fileInput'
                name='file'
                accept={supportedExtensions.map(item => `.${item}`)}
                onChange={this.handleFileChange}
                multiple />
              {
                this.state.modals.upload.isUploading
                  ? (
                    <label class='flex flex-full-center'>
                      {viewStrings.input.uploading_file} {this.state.modals.upload.uploadedFileCount}/{this.state.modals.upload.selectedFiles.length}
                    </label>
                  )
                  : (
                    <label
                      for='fileInput'
                      class='flex flex-full-center'
                      ref={(el) => { this.uploadLabel = el }}>
                      <Ink />
                      {
                        this.state.modals.upload.selectedFiles.length === 0
                          ? viewStrings.input.text
                          : viewStrings.input.files_text
                      }
                      <svg> {/* SVG label dashed border */}
                        <rect width='100%' height='100%' />
                      </svg>
                    </label>
                  )
              }
              {
                this.state.modals.upload.isUploading
                  ? null
                  : (
                    <p title={this.state.modals.upload.selectedFiles.join(', ')}>
                      {this.state.modals.upload.selectedFiles.length} {viewStrings.input.files_selected}
                    </p>
                  )
              }
              <Button
                type='submit'
                text={viewStrings.input.upload_submit}
                disabled={this.state.modals.upload.isUploading}
                spinner={this.state.modals.upload.isUploading}
                spinnerColor='#fff'
                spinnerSize='14'
                contrast
                tabindex='-1' />
            </form>
            <div class={`flex flex-dc flex-cross-center ${style.formatInfo}`}>
              <h6>Supported files:</h6>
              {!isFetchingUser &&
              <div class='flex flex-cross-center flex-sa'>
                <p><Icon iconName='file-video' />&nbsp;<span>{strData.supportedVideoExtensions.join(', ')}</span></p>
                <p><Icon iconName='file-image' />&nbsp;<span>{strData.supportedImageExtensions.join(', ')}</span></p>
              </div>}
            </div>
          </div>
        </Modal>
      </span>
    )
  }
}))
