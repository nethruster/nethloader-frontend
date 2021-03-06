import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import VirtualList from 'react-virtual-list'

import Upload from './upload'
import UploadsToolbar from './uploads-toolbar'
import Modal from '../../../shared/modal'
import ViewLoading from '../../../shared/view-loading'
import { deleteMedia } from 'serverAPI/media'
import { mediaSelect, mediaUnselect, mediaUnselectAll } from 'actions/media'
import { scrollBlockOn, scrollBlockOff } from 'preventScroll'

import style from './styles.scss'

const viewStrings = locale.cp.overview.uploads // eslint-disable-line no-undef

const mapStateToProps = (state) => {
  const { isFetchingMedia, userMedia, params, totalCount } = state.userMedia
  const { isFetchingUser } = state.userData
  const { sessionData, token } = state.authentication
  const { selectedMedia } = state.mediaSelect

  return {
    isFetchingMedia,
    userMedia,
    selectedMedia,
    sessionData,
    token,
    params,
    totalCount,
    isFetchingUser
  }
}

export default connect(mapStateToProps)(class Uploads extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modals: {
        singleDeleteActive: false,
        multipleDeleteActive: false
      },
      isDeleting: false
    }

    this.toggleDeleteConfirmModal = this.toggleDeleteConfirmModal.bind(this)
    this.handleToggleMedia = this.handleToggleMedia.bind(this)
    this.confirmSingleDelete = this.confirmSingleDelete.bind(this)
    this.confirmMultipleDelete = this.confirmMultipleDelete.bind(this)
  }

  componentWillMount () {
    const list = ({
      virtual,
      itemHeight
    }) => (
      <ul style={virtual.style}>
        {virtual.items.map(item => (
          <Upload
            style={style}
            key={item.id}
            data={item}
            user={this.props.sessionData.id}
            handleToggleSelect={this.handleToggleMedia}
            toggleDeleteConfirmModal={this.toggleDeleteConfirmModal}
          />
        ))}
      </ul>
    )

    this.mediaVirtualList = VirtualList()(list)
  }

  toggleIsDeleting () {
    this.setState({ isDeleting: !this.state.isDeleting })
  }

  computeMediaList () {
    let mediaList = this.props.userMedia.images
    if (this.props.totalCount > 0 && Object.keys(mediaList).length > 0) {
      return (
        <this.mediaVirtualList
          items={mediaList}
          itemHeight={90}
          itemBuffer={5}
        />
      )
    }

    return (
      <p class={`nomedia flex flex-full-center flex-dc`}>
        {viewStrings.no_media}<br />
        <small class='flex flex-full-center'>
          {this.props.totalCount > 0 ? viewStrings.no_filtered_media : viewStrings.add_media_description}
        </small>
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
      this.props.dispatch(mediaSelect(selectedMedia, Number(selectedMedia.length) === Number(this.props.totalCount)))
    }
  }

  // Delete
  toggleDeleteConfirmModal () {
    if (!this.state.isDeleting && this.props.selectedMedia.length > 0) {
      let modals = {
        ...this.state.modals
      }

      if (this.props.selectedMedia.length === 1) {
        // If we're not multiple-selecting or we're deleting just one item
        modals.singleDeleteActive = !modals.singleDeleteActive
      } else {
        modals.multipleDeleteActive = !modals.multipleDeleteActive
      }

      modals.singleDeleteActive || modals.multipleDeleteActive ? scrollBlockOn() : scrollBlockOff()

      this.setState({ modals })
    }
  }

  confirmSingleDelete () {
    this.props.dispatch(deleteMedia(this.props.selectedMedia[0], this.props.token)).then(() => {
      // Reset selected items list
      this.props.dispatch(mediaUnselectAll())
      // Refresh data
      this.props.updateUserMedia(this.props.params)
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
          this.props.updateUserMedia(this.props.params)
          this.toggleDeleteConfirmModal()
        }
      })
    }
  }

  render ({ isFetchingMedia, isFetchingUser, userMedia, selectedMedia, updateUserMedia, totalCount }) {
    return (
      <div class={style.uploads}>
        {
          Number(totalCount) > 0 &&
          <UploadsToolbar
            handleDeleteClick={this.toggleDeleteConfirmModal}
            updateUserMedia={updateUserMedia}
          />
        }
        {
          isFetchingMedia
            ? <ViewLoading />
            : this.computeMediaList()
        }

        {/* Single Delete Modal */}
        <Modal
          isActive={this.state.modals.singleDeleteActive}
          modalTitle={viewStrings.modals.title}
          toggleModal={this.toggleDeleteConfirmModal}
          closeButtonText={viewStrings.modals.deny}
          acceptButtonText={viewStrings.modals.confirm}
          onAcceptExecute={this.confirmSingleDelete}>
          <p class='flex flex-full-center'>{viewStrings.modals.confirm_single_delete}</p>
        </Modal>
        {/* Multiple Delete Modal */}
        <Modal
          isActive={this.state.modals.multipleDeleteActive}
          modalTitle={viewStrings.modals.title}
          toggleModal={this.toggleDeleteConfirmModal}
          closeButtonText={viewStrings.modals.deny}
          acceptButtonText={viewStrings.modals.confirm}
          onAcceptExecute={this.confirmMultipleDelete}
          disabled={this.state.isDeleting}>
          <p class='flex flex-full-center'>
            {selectedMedia.length} {viewStrings.modals.confirm_multiple_delete}
          </p>
        </Modal>
      </div>
    )
  }
})
