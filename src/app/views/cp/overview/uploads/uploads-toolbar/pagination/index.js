import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { NavLink } from 'react-router-dom'

import Icon from '../../../../../shared/icon'
import { getPageFactor } from 'utils'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {userMedia, indexOffset, mediaLimit, isFetchingMedia} = state.userMedia

  return {
    userMedia,
    isFetchingMedia,
    indexOffset,
    mediaLimit
  }
}

export default connect(mapStateToProps)(class UploadsPagination extends Component {
  constructor (props, context) {
    super(props)
  
    this.loadPrevPage = this.loadPrevPage.bind(this)
    this.loadNextPage = this.loadNextPage.bind(this)
    this.hasPrevPage = this.hasPrevPage.bind(this)
    this.hasNextPage = this.hasNextPage.bind(this)
  }

  componentWillMount () {
    this.pageFactor = getPageFactor(this.context.router)
  }

  // Pagination
  loadPrevPage () {
    let nextPageFactor = this.pageFactor - 1
    let nextOffset = nextPageFactor * this.props.mediaLimit
    
    if (nextOffset >= 0) {
      this.context.router.history.push(`/cp/p/${nextPageFactor}`)
    }
  }

  loadNextPage () {
    let nextPageFactor = this.pageFactor + 1
    let nextOffset = nextPageFactor * this.props.mediaLimit

    if (nextOffset <= this.props.userMedia.totalCount) {
      this.context.router.history.push(`/cp/p/${nextPageFactor}`)
    }
  }

  hasPrevPage () {
    let nextPageFactor = this.pageFactor - 1
    let nextOffset = nextPageFactor * this.props.mediaLimit

    return nextOffset >= 0 && this.props.indexOffset > 0
  }

  hasNextPage () {
    let nextPageFactor = this.pageFactor + 1
    let nextOffset = nextPageFactor * this.props.mediaLimit

    return nextOffset < this.props.userMedia.totalCount && !(this.props.userMedia.totalCount === this.props.mediaLimit)
  }

  computePageList () {
    // Can be decimal, if that's the case round up to add another page for the remaining media
    let nPages = Math.ceil(this.props.userMedia.totalCount / this.props.mediaLimit)
    // Create an array from a number, v (value) is empty (undefined) but it is the first argument of the array item so we cannot bypass it
    let pagesArray = Array.from({ length: nPages }, (v, i) => i)

    return pagesArray.map((entry) => {
      // Special case: page 0 loads on /cp/p/0 but also on /cp/, here we make sure that it has an active class in both cases
      if (/(\/cp\/?(\/p\/)?$)/gm.test(this.context.router.route.location.pathname) && !entry) {
        return <NavLink class='active' exact to={`/cp/p/${entry}`}><span class='flex flex-full-center'>{entry}</span></NavLink>
      }
      
      return <NavLink exact to={`/cp/p/${entry}`}><span class='flex flex-full-center'>{entry}</span></NavLink>
    })
  }

  render ({isFetchingMedia, mediaLimit, userMedia}) {
    return (
      <div class={`${style.pagination}`}>
        {isFetchingMedia ? 'Loading...'
          : <div class={`flex flex-full-center ${style.paginationNav}`}>
            <span class={`${style.paginationNavButton} ${!isFetchingMedia && this.hasPrevPage() ? '' : style.paginationNavButtonDisabled}`} onClick={this.loadPrevPage} ripple='ripple' ref={(el) => { this.prevButton = el }}>
              <Icon iconName='left-arrow' />
              <p>Prev Page</p>
            </span>
            <div class={`flex flex-full-center ${style.paginationList}`}>
              {userMedia.totalCount / mediaLimit > 1 ? this.computePageList() : null}
            </div>
            <span class={`${style.paginationNavButton} ${!isFetchingMedia && this.hasNextPage() ? '' : style.paginationNavButtonDisabled}`} onClick={this.loadNextPage} ripple='ripple' ref={(el) => { this.nextButton = el }}>
              <Icon iconName='right-arrow' />
              <p>Next page</p>
            </span>
          </div>}
      </div>
    )
  }
})
