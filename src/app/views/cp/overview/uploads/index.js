import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Upload from './upload'
import UploadsToolbar from './uploads-toolbar'
import Modal from '../../../shared/modal'

import { deleteMedia } from 'serverAPI/media'
import { mediaSelect, mediaUnselect, mediaSelectAll, mediaUnselectAll } from 'actions/media'

import locale from 'locale'

import style from './styles.scss'

const viewStrings = locale.cp.overview.uploads

const mapStateToProps = (state) => {
  const {isFetching, data} = state.data
  const {token, sessionData} = state.authentication
  const {selectedMedia, allToggled} = state.mediaSelect

  return {
    isFetching,
    data,
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

  computeMediaList () {
    let mediaList = this.props.data.images
    if (mediaList.length > 0) {
      return mediaList.map((entry, index) =>
        <Upload key={entry.id} data={entry} isSelected={this.props.selectedMedia.includes(entry.id)} selectMode={this.state.isSelecting} handleToggleSelect={this.handleToggleMedia} />
      )
    } else {
      return (<p class={`${style.nomedia} flex flex-full-center`}>
        {viewStrings.no_media}
      </p>)
    }
  }

  toggleIsSelecting () {
    this.setState({isSelecting: !this.state.isSelecting})
  }

  toggleIsDeleting () {
    this.setState({ isDeleting: !this.state.isDeleting })
  }

  handleToggleMedia (event) {
    let id = event.target.id
    let selectedMedia = this.props.selectedMedia

    if (selectedMedia.includes(id)) {
      selectedMedia.splice(selectedMedia.indexOf(id), 1)
      this.props.dispatch(mediaUnselect(selectedMedia))
    } else {
      selectedMedia.push(id)
      this.props.dispatch(mediaSelect(selectedMedia))
    }
  }

  handleToggleAllMedia () {
    let selectedMedia = this.props.data.images.map(el => el.id)

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
        modals.singleDelete.isActive = !modals.singleDelete.isActive
      } else {
        modals.multipleDelete.isActive = !modals.multipleDelete.isActive
      }

      this.setState({modals})
    }
  }

  confirmSingleDelete () {
    this.props.dispatch(deleteMedia(this.props.selectedMedia[0], this.props.token))
    this.toggleDeleteConfirmModal()
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
          this.toggleDeleteConfirmModal()
        }
      })
    })
  }

  render ({dispatch, isFetching, data, selectedMedia}) {
    const hasMedia = !isFetching && data.images.length > 0
    return (
      <div class={style.uploads}>
        {hasMedia ? <UploadsToolbar isSelecting={this.state.isSelecting} toggleIsSelecting={this.toggleIsSelecting} handleDeleteClick={this.toggleDeleteConfirmModal} toggleSelectAll={this.handleToggleAllMedia} hasMedia={hasMedia} />
        : null }
        <ul>
          {isFetching ? `${viewStrings.loading_media}...` : this.computeMediaList('byDate')}
        </ul>
        <Modal isActive={this.state.modals.singleDelete.isActive} toggleModal={this.toggleDeleteConfirmModal} closeButtonText='Wait, no' acceptButtonText='Yes, do it' onAcceptExecute={this.confirmSingleDelete}>
          <p class='flex flex-full-center'>Are you sure that you want to delete the selected item?</p>
        </Modal>
        <Modal isActive={this.state.modals.multipleDelete.isActive} toggleModal={this.toggleDeleteConfirmModal} closeButtonText='Wait, no' acceptButtonText='Yes, do it' onAcceptExecute={this.confirmMultipleDelete}>
          <p class='flex flex-full-center'>
            You are about to delete {selectedMedia.length} items, are you sure that you want to proceed?
          </p>
        </Modal>
      </div>
    )
  }
})
