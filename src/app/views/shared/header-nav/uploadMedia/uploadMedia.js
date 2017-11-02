import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'
import { connect } from 'preact-redux'

import Button from '../../button/button.js'
import Modal from '../../modal/modal.js'

import { uploadMedia } from 'serverAPI/media'
import { isValidFormat } from 'utils'

import style from './uploadMedia.scss'

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
          uploadingFileIndex: 0,
          isUploading: false
        }
      }
    }

    this.toggleUploadModal = this.toggleUploadModal.bind(this)
    this.resetFileInput = this.resetFileInput.bind(this)
    this.handleUploadSubmit = this.handleUploadSubmit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.increaseUploadingFileIndexCount = this.increaseUploadingFileIndexCount.bind(this)
    this.toggleIsUploading = this.toggleIsUploading.bind(this)
    this.handleFileDrop = this.handleFileDrop.bind(this)
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

  resetFileInput (event) {
    let modals = {
      ...this.state.modals
    }

    event.target.value = ''
    modals.upload.files = []
    modals.upload.selectedFiles = []
    modals.upload.uploadingFileIndex = 0

    this.setState({modals})
  }

  increaseUploadingFileIndexCount () {
    let modals = {
      ...this.state.modals
    }

    modals.upload.uploadingFileIndex++

    this.setState({modals})
  }

  toggleIsUploading () {
    let modals = {
      ...this.state.modals
    }

    modals.upload.isUploading = !modals.upload.isUploading

    this.setState({modals})
  }

  handleUploadSubmit (event) {
    event.preventDefault()
    if (this.state.modals.upload.files.length <= 0) {
      console.log('No files selected')
    } else if (this.state.modals.upload.files.length > 0) {
      this.toggleIsUploading()

      this.state.modals.upload.files.forEach((file, index) => {
        this.props.dispatch(uploadMedia(this.props.sessionData.id, file, this.props.token)).then((imageId) => {
          this.increaseUploadingFileIndexCount()

          return imageId
        }).then((imageId) => {
          if (this.state.modals.upload.uploadingFileIndex === this.state.modals.upload.selectedFiles.length) {
            this.toggleIsUploading()
            this.resetFileInput(event)
            this.toggleUploadModal()
            this.props.history.push(`/${imageId}`)
          }
        })
      })
    } else {
      console.log('Something went wrong')
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
        console.log('Detected invalid file type: ' + event.target.files[i].name)
      }
    }

    this.setState({modals})
  }

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
    const uploadModalContent = (
      <div>
        <form onSubmit={this.handleUploadSubmit} class={`${style.uploadForm} flex flex-dc flex-full-center`}>
          <input type='file' id='fileInput' name='file' accept='image/*, video/*' onChange={this.handleFileChange} multiple />
          {this.state.modals.upload.isUploading ? <label class='flex flex-full-center'>Uploading file {this.state.modals.upload.uploadingFileIndex}/{this.state.modals.upload.selectedFiles.length}</label> : <label onDragOver={this.onDragOver} onDrop={this.handleFileDrop} for='fileInput' class='flex flex-full-center'>{this.state.modals.upload.selectedFiles.length === 0 ? 'Click to add files or drop them here' : 'Click to add more files or drop them here'}</label>}
          {this.state.modals.upload.isUploading ? null : <p title={this.state.modals.upload.selectedFiles.join(',')}>{this.state.modals.upload.selectedFiles.length} files selected</p>}
          <Button type='submit' text='Upload' spinner={this.state.modals.upload.isUploading} disabled={this.state.modals.upload.isUploading} spinnerColor='#fff' spinnerSize='14' contrast tabindex='-1' />
        </form>
      </div>
    )

    return (
      <span>
        <Button text='Upload' icon='upload' navButton onClickExecute={this.toggleUploadModal} />
        <Modal modalTitle='' modalContent={uploadModalContent} isActive={this.state.modals.upload.isActive} toggleModal={this.toggleUploadModal} />
      </span>

    )
  }
}))
