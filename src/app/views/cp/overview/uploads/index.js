import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Upload from './upload'
import UploadsToolbar from './uploads-toolbar'
import Modal from '../../../shared/modal'

import { deleteMedia } from 'serverAPI/media'
import { getUserMedia } from 'serverAPI/data'
import { mediaSelect, mediaUnselect, mediaSelectAll, mediaUnselectAll } from 'actions/media'

import locale from 'locale'

import style from './styles.scss'

const viewStrings = locale.cp.overview.uploads

const mapStateToProps = (state) => {
  const {isFetchingMedia, userMedia} = state.userMedia
  const {token, sessionData} = state.authentication
  const {selectedMedia, allToggled} = state.mediaSelect

  return {
    isFetchingMedia,
    userMedia,
    token,
    sessionData,
    selectedMedia,
    allToggled
  }
}

export default connect(mapStateToProps)(class Uploads extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isSelecting: false,
      modals: {
        singleDelete: {
          isActive: false,
          id: ''
        },
        multipleDelete: {
          isActive: false
        }
      },
      isDeleting: false
    }

    this.toggleIsSelecting = this.toggleIsSelecting.bind(this)
    this.toggleDeleteConfirmModal = this.toggleDeleteConfirmModal.bind(this)
    this.handleToggleMedia = this.handleToggleMedia.bind(this)
    this.handleToggleAllMedia = this.handleToggleAllMedia.bind(this)
    this.confirmSingleDelete = this.confirmSingleDelete.bind(this)
    this.confirmMultipleDelete = this.confirmMultipleDelete.bind(this)
  }

  componentWillMount () {
    this.props.dispatch(getUserMedia(this.props.sessionData.id, this.props.token))
  }

  toggleIsSelecting () {
    this.setState({isSelecting: !this.state.isSelecting})
  }

  toggleIsDeleting () {
    this.setState({ isDeleting: !this.state.isDeleting })
  }

  computeMediaList () {
    let mediaList = this.props.userMedia.images
    if (!!mediaList && mediaList.length > 0) {
      return mediaList.map((entry, index) =>
        <Upload key={entry.id} data={entry} isSelected={this.props.selectedMedia.includes(entry.id)} selectMode={this.state.isSelecting} handleToggleSelect={this.handleToggleMedia} toggleDeleteConfirmModal={this.toggleDeleteConfirmModal} />
      )
    }
    return (
      <p class={`${style.nomedia} flex flex-full-center`}>
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

  handleToggleAllMedia () {
    // Add all images available to selectedMedia
    let selectedMedia = this.props.userMedia.images.map(el => el.id)

    if (this.props.allToggled) {
      this.props.dispatch(mediaUnselectAll())
    } else {
      this.props.dispatch(mediaSelectAll(selectedMedia))
    }
  }

  // Delete
  toggleDeleteConfirmModal () {
    if (!this.state.isDeleting && this.props.selectedMedia.length > 0) {
      let modals = {
        ...this.state.modals
      }

      if (!this.state.isSelecting || this.props.selectedMedia.length === 1) {
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
      this.props.dispatch(getUserMedia(this.props.sessionData.id, this.props.token))
      this.toggleDeleteConfirmModal()
    })
  }

  confirmMultipleDelete () {
    let selectedMedia = this.props.selectedMedia
    let deleteIndexCount = 0

    this.toggleIsDeleting()

    selectedMedia.forEach((mediaId) => {
      this.props.dispatch(deleteMedia(mediaId, this.props.token)).then(() => {
        deleteIndexCount++

        if (deleteIndexCount === selectedMedia.length) {
          this.toggleIsDeleting()
          // Reset selected items list
          this.props.dispatch(mediaUnselectAll())
          // Refresh data
          this.props.dispatch(getUserMedia(this.props.sessionData.id, this.props.token))
          this.toggleDeleteConfirmModal()
        }
      })
    })
  }

  render ({dispatch, isFetchingMedia, userMedia, selectedMedia}) {
    return (
      <div class={style.uploads}>
        {
          !isFetchingMedia && userMedia.images.length > 0 && <UploadsToolbar isSelecting={this.state.isSelecting} toggleIsSelecting={this.toggleIsSelecting} handleDeleteClick={this.toggleDeleteConfirmModal} toggleSelectAll={this.handleToggleAllMedia} hasMedia={!!userMedia} />
        }
        <ul>
          {isFetchingMedia ? `${viewStrings.loading_media}...` : this.computeMediaList()}
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
