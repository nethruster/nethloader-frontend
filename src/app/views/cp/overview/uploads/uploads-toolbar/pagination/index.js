import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Icon from '../../../../../shared/icon'
import {getUserMedia} from 'serverAPI/data'
import mdripple from 'mdripple'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {userMedia, indexOffset, mediaLimit, isFetchingMedia} = state.userMedia
  const {token, sessionData} = state.authentication

  return {
    userMedia,
    isFetchingMedia,
    indexOffset,
    mediaLimit,
    token,
    sessionData
  }
}

export default connect(mapStateToProps)(class UploadsPagination extends Component {
  constructor (props) {
    super(props)

    this.state = {
      nextOffset: 0
    }

    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
  }

  componentDidMount () {
    mdripple(this.prevButton)
    mdripple(this.nextButton)
  }

  // Pagination
  prevPage () {
    let nextOffset = this.props.indexOffset - this.props.mediaLimit

    if (nextOffset >= 0) {
      this.setState({ nextOffset })

      this.props.dispatch(getUserMedia(this.props.sessionData.id, this.props.token, '', this.props.mediaLimit, this.state.nextOffset))
    }
  }

  nextPage () {
    let nextOffset = this.props.indexOffset + this.props.mediaLimit

    if (nextOffset <= this.props.userMedia.totalCount) {
      this.setState({ nextOffset })

      this.props.dispatch(getUserMedia(this.props.sessionData.id, this.props.token, '', this.props.mediaLimit, this.state.nextOffset))
    }
  }

  hasPrevPage () {
    return this.state.nextOffset - this.props.mediaLimit > 0 || this.state.nextOffset > 0
  }

  hasNextPage () {
    return this.state.nextOffset + this.props.mediaLimit <= this.props.userMedia.totalCount
  }

  render ({isFetchingMedia}) {
    return (
      <div class={`${style.pagination}`}>
        <div class={`flex flex-sb ${style.paginationNav}`}>
          <span class={`${style.paginationNavButton} ${!isFetchingMedia && this.hasPrevPage() ? '' : style.paginationNavButtonDisabled}`} onClick={this.prevPage} ripple='ripple' ref={(el) => { this.prevButton = el }}>
            <Icon iconName='left-arrow' />
            <p>Prev Page</p>
          </span>
          <span class={`${style.paginationNavButton} ${!isFetchingMedia && this.hasNextPage() ? '' : style.paginationNavButtonDisabled}`} onClick={this.nextPage} ripple='ripple' ref={(el) => { this.nextButton = el }}>
            <Icon iconName='right-arrow' />
            <p>Next page</p>
          </span>
        </div>
      </div>
    )
  }
})
