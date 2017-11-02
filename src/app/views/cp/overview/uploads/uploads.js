import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import { deleteMedia } from 'serverAPI/media'

import Upload from './upload/upload.js'

import style from './uploads.scss'

function mapStateToProps (state) {
  const {isFetching, data} = state.data
  const {token, sessionData} = state.authentication

  return {
    isFetching,
    data,
    token,
    sessionData
  }
}

export default connect(mapStateToProps)(class Uploads extends Component {
  constructor (props) {
    super(props)

    this.handleDeleteMedia = this.handleDeleteMedia.bind(this)
  }

  compareByDate (a, b) {
    if (a.createdAt > b.createdAt) {
      return -1
    }
    if (a.createdAt < b.createdAt) {
      return 1
    }
    return 0
  }

  computeMediaList (sort) {
    let mediaList = this.props.data.images
    if (mediaList.length > 0) {
      switch (sort) {
        case 'byDate':
          mediaList.sort(this.compareByDate)
          break
        default:
          break
      }
      return mediaList.map((entry, index) => {
        return <Upload key={index} data={entry} deleteMedia={this.handleDeleteMedia} />
      })
    } else {
      return (<p class={`${style.nomedia} flex flex-full-center`} ripple='ripple'>
                No media available
              </p>)
    }
  }

  handleDeleteMedia (childElement) {
    this.props.dispatch(deleteMedia(childElement.dataset.id, this.props.token, this.props.sessionData.id))
  }

  render ({dispatch}) {
    return (
      <div class={style.uploads}>
        <ul ref={(el) => { this.mediaListDOMNode = el }}>
          {this.props.isFetching ? 'Loading media...' : this.computeMediaList('byDate')}
        </ul>
      </div>
    )
  }
})
