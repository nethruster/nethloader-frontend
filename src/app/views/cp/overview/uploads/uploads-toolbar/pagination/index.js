import {h, Component} from 'preact'
import {connect} from 'preact-redux'
import {NavLink} from 'react-router-dom'
import Ink from 'react-ink'

import Icon from '../../../../../shared/icon'
import Button from '../../../../../shared/button'
import DropDownMenu from '../../../../../shared/dropdown-menu'
import {getPageFactor} from 'utils'
import {scrollBlockOff} from 'preventScroll'

import style from './styles.scss'

const viewStrings = locale.cp.overview.uploads.pagination // eslint-disable-line no-undef

const mapStateToProps = (state) => {
  const {userMedia, params, isFetchingMedia} = state.userMedia

  return {
    userMedia,
    isFetchingMedia,
    params
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
    let nextOffset = nextPageFactor * this.props.params.mediaLimit

    if (nextOffset >= 0) {
      this.context.router.history.push(`/cp/overview/${nextPageFactor + 1}`)
    }
  }

  loadNextPage () {
    let nextPageFactor = this.pageFactor + 1
    let nextOffset = nextPageFactor * this.props.params.mediaLimit

    if (nextOffset <= this.props.userMedia.totalCount) {
      this.context.router.history.push(`/cp/overview/${nextPageFactor + 1}`)
    }
  }

  loadFirstPage () {
    this.context.router.history.push('/cp/overview/1')
  }

  loadLastPage () {
    let lastPage = Math.ceil(this.props.userMedia.totalCount / this.props.params.mediaLimit)
    this.context.router.history.push(`/cp/overview/${lastPage}`)
  }

  hasPrevPage () {
    let nextPageFactor = this.pageFactor - 1
    let nextOffset = nextPageFactor * this.props.params.mediaLimit

    return nextOffset >= 0
  }

  hasNextPage () {
    let nextPageFactor = this.pageFactor + 1
    let nextOffset = nextPageFactor * this.props.params.mediaLimit

    return nextOffset < this.props.userMedia.totalCount && !(this.props.userMedia.totalCount === this.props.params.mediaLimit)
  }

  computePageList () {
    // Can be a fraction, if that's the case round up to add another page for the remaining media
    let nPages = Math.ceil(this.props.userMedia.totalCount / this.props.params.mediaLimit)
    // Create an array from a number, v (value) is empty (undefined) but it is the first argument of the array item so we cannot bypass it
    let pagesArray = Array.from({ length: nPages }, (v, i) => i)

    return pagesArray.map((entry) => {
      return (
        <NavLink
          exact
          activeClassName='pagelist-active'
          to={entry === 0 ? '/cp/overview/' : `/cp/overview/${entry + 1}`}>
          <Button
            class='flex flex-full-center'
            dropdown
            onClickExecute={scrollBlockOff}
            text={entry + 1}
          />
        </NavLink>
      )
    })
  }

  render ({isFetchingMedia, userMedia}) {
    return (
      <div class={`flex flex-main-center flex-sb ${style.paginationNav}`}>
        <div
          class={`${style.paginationNavButton} ${style.paginationNavButtonLeft} ${!isFetchingMedia && this.hasPrevPage()
            ? ''
            : style.paginationNavButtonDisabled}`}
          onClick={this.loadFirstPage}>
          <p>{viewStrings.first_page}</p>
          <Icon iconName='skip-left' />
          <Ink />
        </div>
        <div class='flex'>
          <div
            class={`${style.paginationNavButton} ${style.paginationNavButtonLeft} ${!isFetchingMedia && this.hasPrevPage()
              ? ''
              : style.paginationNavButtonDisabled}`}
            onClick={this.loadPrevPage}>
            <p>{viewStrings.previous_page}</p>
            <Icon iconName='left-arrow' />
            <Ink />
          </div>
          <div class={`flex ${style.paginationList}`}>
            <DropDownMenu centered noMinWidth navTrigger localePageString={viewStrings.page}>
              {this.computePageList()}
            </DropDownMenu>
          </div>
          <div
            class={`${style.paginationNavButton} ${style.paginationNavButtonRight} ${!isFetchingMedia && this.hasNextPage()
              ? ''
              : style.paginationNavButtonDisabled}`}
            onClick={this.loadNextPage}>
            <p>{viewStrings.next_page}</p>
            <Icon iconName='right-arrow' />
            <Ink />
          </div>
        </div>
        <div
          class={`${style.paginationNavButton} ${style.paginationNavButtonRight} ${!isFetchingMedia && this.hasNextPage()
            ? ''
            : style.paginationNavButtonDisabled}`}
          onClick={this.loadLastPage}>
          <p>{viewStrings.last_page}</p>
          <Icon iconName='skip-right' />
          <Ink />
        </div>
      </div>
    )
  }
})
