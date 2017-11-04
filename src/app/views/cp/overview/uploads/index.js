import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Upload from './upload'
import Button from '../../../shared/button'
import Icon from '../../../shared/icon'

import { deleteMedia } from 'serverAPI/media'
import locale from 'locale'

import style from './styles.scss'

const viewStrings = locale.cp.overview.uploads

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

    this.state = {
      isSelecting: false,
      selectedMedia: []
    }

    this.handleDeleteMedia = this.handleDeleteMedia.bind(this)
    this.toggleIsSelecting = this.toggleIsSelecting.bind(this)
    this.handleSelectedMedia = this.handleSelectedMedia.bind(this)
    this.deleteSelectedMedia = this.deleteSelectedMedia.bind(this)
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
        return <Upload key={index} data={entry} deleteMedia={this.handleDeleteMedia} selectMode={this.state.isSelecting} handleToggleSelect={this.handleSelectedMedia} />
      })
    } else {
      return (<p class={`${style.nomedia} flex flex-full-center`}>
        {viewStrings.no_media}
      </p>)
    }
  }

  handleSelectedMedia (id, state) {
    let selectedMedia = this.state.selectedMedia

    if (state) {
      selectedMedia.push(id)
    } else if (selectedMedia.includes(id)) {
      selectedMedia.splice(selectedMedia.indexOf(id), 1)
    }

    this.setState({selectedMedia})
  }

  handleDeleteMedia (childElement) {
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
        {hasMedia ? <div class={`flex ${style.uploadsMenu}`}>
          <div class={`flex flex-cross-center flex-sb ${style.uploadsMenuSelect}`}>
            <Button text={this.state.isSelecting ? 'Disable select' : 'Enable select'} customClass={style.uploadsMenuButton} small contrast onClickExecute={this.toggleIsSelecting} disabled={!hasMedia} />
            <div class={`flex flex-cross-center flex-sb ${style.uploadsMenuSelectButtons} ${this.state.isSelecting ? style.uploadsMenuSelectButtonsActive : ''}`}>
              {/* <span class='flex flex-full-center'><Icon iconName='selectall' /></span> */}
              <span class='flex flex-full-center' onClick={this.deleteSelectedMedia}><Icon iconName='delete' iconColor='#e53935' /></span>
            </div>
          </div>
        </div>
        : null }
        <ul ref={(el) => { this.mediaListDOMNode = el }}>
          {isFetching ? `${viewStrings.loading_media}...` : this.computeMediaList('byDate')}
        </ul>
      </div>
    )
  }
})
