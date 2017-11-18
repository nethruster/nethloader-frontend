import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Upload from './upload'
import UploadsToolbar from './uploads-toolbar'
import Modal from '../../../shared/modal'
import ViewLoading from '../../../shared/view-loading'

import { deleteMedia } from 'serverAPI/media'
import { mediaSelect, mediaUnselect, mediaUnselectAll } from 'actions/media'
import { scrollBlockOn, scrollBlockOff } from 'preventScroll'

import locale from 'locale'

import style from './styles.scss'

const viewStrings = locale.cp.overview.uploads

const mapStateToProps = (state) => {
  const {isFetchingMedia, userMedia} = state.userMedia
  const {sessionData, token} = state.authentication
  const {selectedMedia} = state.mediaSelect

  return {
    isFetchingMedia,
    userMedia,
    selectedMedia,
    sessionData,
    token
  }
}

export default connect(mapStateToProps)(class Uploads extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modals: {
        singleDelete: {
          isActive: false
        },
        multipleDelete: {
          isActive: false
        }
      },
      isDeleting: false
    }

    this.toggleDeleteConfirmModal = this.toggleDeleteConfirmModal.bind(this)
    this.handleToggleMedia = this.handleToggleMedia.bind(this)
    this.confirmSingleDelete = this.confirmSingleDelete.bind(this)
    this.confirmMultipleDelete = this.confirmMultipleDelete.bind(this)
  }

  toggleIsDeleting () {
    this.setState({isDeleting: !this.state.isDeleting})
  }

  sortByDate (imageA, imageB) {
    return new Date(imageB.createdAt) - new Date(imageA.createdAt)
  }

  computeMediaList () {
    let mediaList = this.props.userMedia.images
    // Sort from most recent to oldest
    mediaList.sort(this.sortByDate)
    if (mediaList && mediaList.length > 0) {
      return mediaList.map((entry, index) =>
        <Upload key={entry.id} data={entry} isSelected={this.props.selectedMedia.includes(entry.id)} handleToggleSelect={this.handleToggleMedia} toggleDeleteConfirmModal={this.toggleDeleteConfirmModal} />
      )
    }
    return (
      <p class={`nomedia flex flex-full-center`}>
        {viewStrings.no_media}
      </p>
    )
  }

  // Select
  handleToggleMedia (event) {
    let id = event.currentTarget.dataset.id

    let selectedMedia = this.props.selectedMedia

    if (selectedMedia.includes(id)) {
      // Item is selected, unselect
      selectedMedia.splice(selectedMedia.indexOf(id), 1)
      this.props.dispatch(mediaUnselect(selectedMedia))
    } else {
      // Item isn't selected, select
      selectedMedia.push(id)
      this.props.dispatch(mediaSelect(selectedMedia))
    }
  }

  // Delete
  toggleDeleteConfirmModal () {
    if (!this.state.isDeleting && this.props.selectedMedia.length > 0) {
      let modals = {
        ...this.state.modals
      }

      modals.singleDelete.isActive || modals.multipleDelete.isActive ? scrollBlockOff() : scrollBlockOn()

      if (this.props.selectedMedia.length === 1) {
        // If we're not multiple-selecting or we're deleting just one item
        modals.singleDelete.isActive = !modals.singleDelete.isActive
      } else {
        modals.multipleDelete.isActive = !modals.multipleDelete.isActive
      }

      this.setState({modals})
    }
  }

  confirmSingleDelete () {
    this.props.dispatch(deleteMedia(this.props.selectedMedia[0], this.props.token)).then(() => {
      // Reset selected items list
      this.props.dispatch(mediaUnselectAll())
      // Refresh data
      this.props.updateUserMedia()
      this.toggleDeleteConfirmModal()
    })
  }

  confirmMultipleDelete () {
    let selectedMedia = this.props.selectedMedia
    let deleteIndexCount = 0

    this.toggleIsDeleting()

    for (let mediaId of selectedMedia) {
      this.props.dispatch(deleteMedia(mediaId, this.props.token)).then(() => {
        deleteIndexCount++

        if (deleteIndexCount === selectedMedia.length) {
          this.toggleIsDeleting()
          // Reset selected items list
          this.props.dispatch(mediaUnselectAll())
          // Refresh data
          this.props.updateUserMedia()
          this.toggleDeleteConfirmModal()
        }
      })
    }
  }
  
  render ({isFetchingMedia, userMedia, selectedMedia, updateUserMedia}) {
    return (
      <div class={style.uploads}>
        {userMedia.totalCount === 0 ? null : <UploadsToolbar handleDeleteClick={this.toggleDeleteConfirmModal} updateUserMedia={updateUserMedia} />}
        <ul class={style.uploadsList}>
          {this.props.isFetchingMedia ? <ViewLoading /> : this.computeMediaList()}
        </ul>
        <Modal isActive={this.state.modals.singleDelete.isActive} toggleModal={this.toggleDeleteConfirmModal} closeButtonText='Wait, no' acceptButtonText='Yes, do it' onAcceptExecute={this.confirmSingleDelete}>
          <p class='flex flex-full-center'>Are you sure that you want to delete the selected item?</p>
        </Modal>
        <Modal isActive={this.state.modals.multipleDelete.isActive} toggleModal={this.toggleDeleteConfirmModal} closeButtonText='Wait, no' acceptButtonText='Yes, do it' onAcceptExecute={this.confirmMultipleDelete} disabled={this.state.isDeleting}>
          <p class='flex flex-full-center'>
            You are about to delete {selectedMedia.length} items, are you sure that you want to proceed?
          </p>
        </Modal>
      </div>
    )
  }
})
