import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'
import { connect } from 'preact-redux'

import Button from '../../button'
import Modal from '../../modal'

import { isValidFormat } from 'utils'
import { uploadMedia } from 'serverAPI/media'
import locale from 'locale'

import style from './styles.scss'

const viewStrings = locale.shared.upload_media

function mapStateToProps (state) {
  const {token, sessionData} = state.authentication

  return {
    token,
    sessionData
  }
}

export default withRouter(connect(mapStateToProps)(class UploadMedia extends Component {
  constructor (props) {
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
    modals.upload.uploadingFileIndex = 0

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

      filesToUpload.forEach(async (file, index) => {
        this.props.dispatch(uploadMedia(file, this.props.token)).then((imageId) => {
          this.increaseUploadedFileCount()

          if (this.state.modals.upload.uploadedFileCount === this.state.modals.upload.selectedFiles.length) {
            let fileCount = this.state.modals.upload.uploadedFileCount
            this.resetForm(event)
            this.toggleIsUploading()
            this.toggleUploadModal()

            if (fileCount === 1) {
              this.props.history.push(`/${imageId}`)
            }
          }
        })
      })
    } else {
      console.log(viewStrings.response.error)
    }
  }

  handleFileChange (event) {
    let modals = {
      ...this.state.modals
    }

    for (let i = 0; i < event.target.files.length; i++) {
      if (isValidFormat(event.target.files[i].type)) {
        modals.upload.files.push(event.target.files[i])
        modals.upload.selectedFiles.push(event.target.files[i].name)
      } else {
        console.log(`${viewStrings.invalid_file_detected}: ` + event.target.files[i].name)
      }
    }

    this.setState({modals})
  }

  // Drag & drop methods
  onDragOver (event) {
    event.preventDefault()
  }

  handleFileDrop (event) {
    event.preventDefault()

    let modals = {
      ...this.state.modals
    }

    for (let i = 0; i < event.dataTransfer.files.length; i++) {
      modals.upload.files.push(event.dataTransfer.files[i])
      modals.upload.selectedFiles.push(event.dataTransfer.files[i].name)
    }

    this.setState({ modals })
  }

  render ({dispatch, isAuthenticated, token}) {
    return (
      <span>
        <Button text={viewStrings.modal_button} icon='upload' navButton onClickExecute={this.toggleUploadModal} />
        <Modal isActive={this.state.modals.upload.isActive} toggleModal={this.toggleUploadModal}>
          <div>
            <form onSubmit={this.handleUploadSubmit} class={`${style.uploadForm} flex flex-dc flex-full-center`}>
              <input type='file' id='fileInput' name='file' accept='image/*, video/*' onChange={this.handleFileChange} multiple />
              {
                this.state.modals.upload.isUploading
                  ? (
                    <label class='flex flex-full-center'>
                      {viewStrings.input.uploading_file} {this.state.modals.upload.uploadedFileCount}/{this.state.modals.upload.selectedFiles.length}
                    </label>
                  )
                  : (
                    <label onDragOver={this.onDragOver} onDrop={this.handleFileDrop} for='fileInput' class='flex flex-full-center'>
                      {this.state.modals.upload.selectedFiles.length === 0 ? viewStrings.input.text : viewStrings.input.files_text}
                      {/* SVG label dashed border */}
                      <svg>
                        <rect width='100%' height='100%' />
                      </svg>
                    </label>
                  )
              }
              {this.state.modals.upload.isUploading
              ? null
              : (
                <p title={this.state.modals.upload.selectedFiles.join(', ')}>
                  {this.state.modals.upload.selectedFiles.length} {viewStrings.input.files_selected}
                </p>
              )
              }
              <Button type='submit' text={viewStrings.input.upload_submit} spinner={this.state.modals.upload.isUploading} disabled={this.state.modals.upload.isUploading} spinnerColor='#fff' spinnerSize='14' contrast tabindex='-1' />
            </form>
          </div>
        </Modal>
      </span>

    )
  }
}))
