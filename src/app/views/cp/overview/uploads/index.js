import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Upload from './upload'
import UploadsToolbar from './uploads-toolbar'

import { deleteMedia } from 'serverAPI/media'
import { compareDate } from 'utils'
import locale from 'locale'

import style from './styles.scss'

const viewStrings = locale.cp.overview.uploads

const mapStateToProps = (state) => {
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

    this.state = {
      isSelecting: false,
      selectedMedia: []
    }

    this.deleteMediaElement = this.deleteMediaElement.bind(this)
    this.toggleIsSelecting = this.toggleIsSelecting.bind(this)
    this.handleSelectMedia = this.handleSelectMedia.bind(this)
    this.deleteSelectedMedia = this.deleteSelectedMedia.bind(this)
  }

  computeMediaList (sort) {
    let mediaList = this.props.data.images
    if (mediaList.length > 0) {
      switch (sort) {
        case 'byDate':
          mediaList.sort(compareDate)
          break
        default:
          break
      }
      return mediaList.map((entry, index) => {
        return <Upload key={index} data={entry} deleteMedia={this.deleteMediaElement} selectMode={this.state.isSelecting} handleToggleSelect={this.handleSelectMedia} />
      })
    } else {
      return (<p class={`${style.nomedia} flex flex-full-center`}>
        {viewStrings.no_media}
      </p>)
    }
  }

  handleSelectMedia (id, state) {
    let selectedMedia = this.state.selectedMedia

    if (state) {
      selectedMedia.push(id)
    } else if (selectedMedia.includes(id)) {
      selectedMedia.splice(selectedMedia.indexOf(id), 1)
    }

    this.setState({selectedMedia})
  }

  deleteMediaElement (childElement) {
    this.props.dispatch(deleteMedia(childElement.dataset.id, this.props.token, this.props.sessionData.id))
  }

  deleteSelectedMedia () {
    let selectedMedia = this.state.selectedMedia

    for (let item in selectedMedia) {
      this.props.dispatch(deleteMedia(selectedMedia[item], this.props.token, this.props.sessionData.id)).then(() => {
        selectedMedia.splice(selectedMedia.indexOf(item), 1)
      })
    }

    this.setState({selectedMedia})
  }

  toggleIsSelecting () {
    this.setState({isSelecting: !this.state.isSelecting})
  }

  render ({dispatch, isFetching, data}) {
    const hasMedia = !isFetching && data.images.length > 0
    return (
      <div class={style.uploads}>
        {hasMedia ? <UploadsToolbar isSelecting={this.state.isSelecting} toggleIsSelecting={this.toggleIsSelecting} deleteSelectedMedia={this.deleteSelectedMedia} hasMedia={hasMedia} />
        : null }
        <ul ref={(el) => { this.mediaListDOMNode = el }}>
          {isFetching ? `${viewStrings.loading_media}...` : this.computeMediaList('byDate')}
        </ul>
      </div>
    )
  }
})
