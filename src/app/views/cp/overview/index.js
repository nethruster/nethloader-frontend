import {h, Component} from 'preact'
import {Link} from 'react-router-dom'
import {connect} from 'preact-redux'

import Uploads from './uploads'
import Button from '../../shared/button'
import {getUserMedia} from 'serverAPI/data'
import {getPageFactor} from 'utils'

import style from './styles.scss'

const viewStrings = locale.cp.overview // eslint-disable-line no-undef

const mapStateToProps = (state) => {
  const {userMedia, isFetchingMedia, params} = state.userMedia
  const {token, sessionData, isAuthenticated} = state.authentication

  return {
    userMedia,
    isFetchingMedia,
    token,
    sessionData,
    isAuthenticated,
    params
  }
}

export default connect(mapStateToProps)(class Overview extends Component {
  constructor (props, context) {
    super(props)

    this.pageFactor = getPageFactor(context.router)

    this.updateUserMedia = this.updateUserMedia.bind(this)
  }

  componentDidMount () {
    if (this.props.isAuthenticated) {
      this.updateUserMedia(this.props.params)
    }
  }

  componentWillMount () {
    window.scrollTo(0, 0) // Quick hack to fix react-routing scroll issue
  }

  updateUserMedia (params) {
    let newParams = params || {}

    newParams.offset = this.pageFactor * params.mediaLimit

    this.props.dispatch(getUserMedia(this.props.sessionData.id, this.props.token, newParams))
  }

  render ({isFetchingMedia, userMedia, params}) {
    return (
      <div class={`${style.overview} flex flex-main-center`}>
        {
          this.pageFactor && this.pageFactor >= userMedia.totalCount / params.mediaLimit
            ? (
              <p class='nomedia flex flex-dc flex-full-center'>
                <span>{viewStrings.no_page}</span>
                <div class='flex flex-cross-center flex-sa'>
                  <Link to='/cp/overview/'>
                    <Button text={viewStrings.go_to_first_page} />
                  </Link>
                &nbsp;&nbsp;
                  <Link to={`/cp/overview/${this.pageFactor}`}>
                    <Button text={viewStrings.go_to_previous_page} />
                  </Link>
                </div>
              </p>
            )
            : <Uploads updateUserMedia={this.updateUserMedia} />
        }
      </div>
    )
  }
})
