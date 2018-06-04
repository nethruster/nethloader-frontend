import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Icon from '../../../shared/icon'
import Modal from '../../../shared/modal'
import VideoToolbar from '../../../shared/video-element/video-toolbar'
import { isValidVideoFormat } from 'utils'
import Button from '../../../shared/button'
import { scrollBlockOff, scrollBlockOn } from 'preventScroll'

import style from './styles.scss'

const viewStrings = locale.media_view.buttons // eslint-disable-line no-undef

const mapStateToProps = (state) => {
  const { isAuthenticated, token, sessionData } = state.authentication
  const { userData } = state.userData
  const { isFetching } = state.mediaInfo

  return {
    isAuthenticated,
    token,
    userData,
    sessionData,
    isFetching
  }
}

export default connect(mapStateToProps)(class MediaInfoButtons extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isDeleteModalActive: false
    }

    this.mediaSrc = ''
    this.mediaUrl = ''

    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.computeMediaUrls = this.computeMediaUrls.bind(this)

    this.metaScript = document.getElementById('meta-script')
  }

  toggleDeleteModal () {
    this.setState({ isDeleteModalActive: !this.state.isDeleteModalActive })
    this.state.isDeleteModalActive ? scrollBlockOn() : scrollBlockOff()
  }

  handleDeleteClick () {
    this.toggleDeleteModal()
  }

  computeMediaUrls () {
    this.mediaSrc = `${baseMediaPath}${this.props.mediaData.userId}/${this.props.mediaData.id}.${this.props.mediaData.extension}` // eslint-disable-line no-undef
    this.mediaUrl = `${document.location.origin}/${this.props.mediaData.id}`
    return true
  }

  render ({ mediaData, isAuthenticated, userData, sessionData, isFetching }) {
    return (
      <div class='flex flex-cross-center'>
        {(!isFetching || this.metaScript) && this.computeMediaUrls() && // eslint-disable-line no-undef
          <div class={`flex flex-cross-center ${style.utilButtons}`}>
            <a
              href={this.mediaSrc}
              download={mediaData.id}
              rel='noopener'
              title={viewStrings.download}>
              <Button iconButton icon='download' />
            </a>
            <a
              href={this.mediaSrc}
              target='_blank'
              rel='noopener'
              title={viewStrings.view_original}>
              <Button iconButton icon='open-in-new' />
            </a>
            {
              isValidVideoFormat(mediaData.extension) && mediaData.extension !== 'gif' && <VideoToolbar /> // If the element is a video, show video tools
            }
            {
              isAuthenticated && (userData.isAdmin || sessionData.id === mediaData.userId) &&
              <Button
                iconButton
                icon='delete'
                iconColor='#e53935'
                onClickExecute={this.toggleDeleteModal}
              />
            }
            {/* Single Delete Modal */}
            <Modal
              isActive={this.state.isDeleteModalActive}
              modalTitle='Delete item'
              toggleModal={this.toggleDeleteModal}
              closeButtonText='No, wait'
              acceptButtonText='Yes, do it'
              onAcceptExecute={this.handleDeleteClick}>
              <p class='flex flex-full-center'>Are you sure that you want to delete this item?</p>
            </Modal>
          </div>
        }
        <div class={`flex flex-full-center ${style.socialShare}`}>
          <a
            class={`flex flex-full-center ${style.shareButton} ${style.twitter}`}
            title='Share on Twitter'
            rel='noopener'
            target='_blank'
            href={`https://twitter.com/intent/tweet?url=${this.mediaUrl};text=Uploaded media via Nethloader;related=nethruster,gariasf,claudio4sv`}>
            <Icon iconName='twitter' />
          </a>
          <a
            class={`flex flex-full-center ${style.shareButton} ${style.facebook}`}
            title='Share on Facebook'
            href={`http://www.facebook.com/sharer/sharer.php?u=${this.mediaUrl}&display=popup`}>
            <Icon iconName='facebook' />
          </a>
        </div>
      </div>
    )
  }
})
