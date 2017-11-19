import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { NavLink } from 'react-router-dom'

import Icon from '../../../../../shared/icon'
import Button from '../../../../../shared/button'
import Ink from 'react-ink'
import { getPageFactor } from 'utils'

import style from './styles.scss'
import DropDownMenu from '../../../../../shared/dropdown-menu/index'

const mapStateToProps = (state) => {
  const {userMedia, mediaLimit, isFetchingMedia} = state.userMedia

  return {
    userMedia,
    isFetchingMedia,
    mediaLimit
  }
}

export default connect(mapStateToProps)(class Pagination extends Component {
  constructor (props, context) {
    super(props)
  
    this.loadPrevPage = this.loadPrevPage.bind(this)
    this.loadNextPage = this.loadNextPage.bind(this)
    this.hasPrevPage = this.hasPrevPage.bind(this)
    this.hasNextPage = this.hasNextPage.bind(this)
    this.loadFirstPage = this.loadFirstPage.bind(this)
    this.loadLastPage = this.loadLastPage.bind(this)
  }

  componentWillMount () {
    this.pageFactor = getPageFactor(this.context.router)
  }

  // Pagination
  loadPrevPage () {
    let nextPageFactor = this.pageFactor - 1
    let nextOffset = nextPageFactor * this.props.mediaLimit
    
    if (nextOffset >= 0) {
      this.context.router.history.push(`/cp/overview/${nextPageFactor + 1}`)
    }
  }

  loadNextPage () {
    let nextPageFactor = this.pageFactor + 1
    let nextOffset = nextPageFactor * this.props.mediaLimit

    if (nextOffset <= this.props.userMedia.totalCount) {
      this.context.router.history.push(`/cp/overview/${nextPageFactor + 1}`)
    }
  }

  loadFirstPage () {
    this.context.router.history.push('/cp/overview/1')
  }

  loadLastPage () {
    let lastPage = Math.ceil(this.props.userMedia.totalCount / this.props.mediaLimit)
    this.context.router.history.push(`/cp/overview/${lastPage}`)
  }

  hasPrevPage () {
    let nextPageFactor = this.pageFactor - 1
    let nextOffset = nextPageFactor * this.props.mediaLimit

    return nextOffset >= 0
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
      return <NavLink exact activeClassName='pagelist-active' to={`/cp/overview/${entry + 1}`}><Button dropdown text={entry + 1} class='flex flex-full-center' /></NavLink>
    })
  }

  render ({isFetchingMedia, mediaLimit, userMedia}) {
    const customPageListButton = (
      <div class={`flex flex-dc ${style.paginationNavButton} ${style.paginationNavButtonCustom}`}>
        <Ink />
        <p><Icon iconName='chev-down' />&nbsp;Page</p>
        <b>{this.pageFactor + 1}</b>
      </div>
    )

    return (
      <div class={`flex flex-main-center flex-sb ${style.paginationNav}`}>
        <div class={`${style.paginationNavButton} ${style.paginationNavButtonLeft} ${!isFetchingMedia && this.hasPrevPage() ? '' : style.paginationNavButtonDisabled}`} onClick={this.loadFirstPage}>
          <p>First page</p>
          <Icon iconName='skip-left' />
          <Ink />
        </div>
        <div class='flex'>
          <div class={`${style.paginationNavButton} ${style.paginationNavButtonLeft} ${!isFetchingMedia && this.hasPrevPage() ? '' : style.paginationNavButtonDisabled}`} onClick={this.loadPrevPage}>
            <p>Prev Page</p>
            <Icon iconName='left-arrow' />
            <Ink />
          </div>
          <div class={`flex ${style.paginationList}`}>
            {isFetchingMedia
              ? null
              : <DropDownMenu centered noMinWidth customTrigger={customPageListButton}>
                {this.computePageList()}
              </DropDownMenu>
            }
          </div>
          <div class={`${style.paginationNavButton} ${style.paginationNavButtonRight} ${!isFetchingMedia && this.hasNextPage() ? '' : style.paginationNavButtonDisabled}`} onClick={this.loadNextPage}>
            <p>Next page</p>
            <Icon iconName='right-arrow' />
            <Ink />
          </div>
        </div>
        <div class={`${style.paginationNavButton} ${style.paginationNavButtonRight} ${!isFetchingMedia && this.hasNextPage() ? '' : style.paginationNavButtonDisabled}`} onClick={this.loadLastPage}>
          <p>Last page</p>
          <Icon iconName='skip-right' />
          <Ink />
        </div>
      </div>
    )
  }
})
