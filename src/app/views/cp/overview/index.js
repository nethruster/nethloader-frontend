import { h, Component } from 'preact'
import {Link} from 'react-router-dom'
import {connect} from 'preact-redux'

import Uploads from './uploads'
import Button from '../../shared/button'
import { getUserMedia } from 'serverAPI/data'
import { getPageFactor } from 'utils'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const { userMedia, isFetchingMedia, mediaLimit } = state.userMedia
  const { token, sessionData } = state.authentication

  return {
    userMedia,
    isFetchingMedia,
    token,
    sessionData,
    mediaLimit
  }
}

export default connect(mapStateToProps)(class Overview extends Component {
  constructor (props, context) {
    super(props)

    this.pageFactor = getPageFactor(context.router)

    this.updateUserMedia = this.updateUserMedia.bind(this)
  }

  componentWillMount () {
    this.updateUserMedia()
  }

  updateUserMedia () {
    let offset = this.pageFactor * this.props.mediaLimit
    this.props.dispatch(getUserMedia(this.props.sessionData.id, this.props.token, '', this.props.mediaLimit, offset))
  }
  
  render ({ isFetchingMedia, userMedia, mediaLimit }) {
    return (
      <div class={`${style.overview} flex flex-main-center`}>
        {
          this.pageFactor && this.pageFactor >= userMedia.totalCount / mediaLimit
            ? <p class='nomedia flex flex-dc flex-full-center'>
              <span>This page doesn't exist</span>
              <div class='flex flex-cross-center flex-sa'>
                <Link to='/cp/overview/'><Button text='Go to first page' /></Link>
                &nbsp;&nbsp;
                <Link to={`/cp/overview/${this.pageFactor - 1}`}><Button text='Go to previous page' /></Link>
              </div>
            </p>
            : <Uploads updateUserMedia={this.updateUserMedia} />
        }
      </div>
    )
  }
})
