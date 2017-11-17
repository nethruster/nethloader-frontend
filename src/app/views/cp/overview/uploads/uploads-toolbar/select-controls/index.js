import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Button from '../../../../../shared/button'
import { mediaSelectAll, mediaUnselectAll } from 'actions/media'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const { userMedia } = state.userMedia
  const { allToggled } = state.mediaSelect

  return {
    userMedia,
    allToggled
  }
}

export default connect(mapStateToProps)(class SelectControls extends Component {
  constructor (props) {
    super(props)

    this.handleToggleAllMedia = this.handleToggleAllMedia.bind(this)
  }

  handleToggleAllMedia () {
    // Add all images available to selectedMedia
    let selectedMedia = this.props.userMedia.images.map(el => el.id)

    if (this.props.allToggled) {
      this.props.dispatch(mediaUnselectAll())
    } else {
      this.props.dispatch(mediaSelectAll(selectedMedia))
    }
  }

  render ({ isSelecting, toggleIsSelecting, handleDeleteClick, userMedia, updateUserMedia }) {
    return (
      <div class='flex flex-cross-center flex-sb'>
        <Button iconButton icon={isSelecting ? 'select-off' : 'select-on'} onClickExecute={toggleIsSelecting} />
        <div class={`flex flex-cross-center flex-sb ${style.selectButtons} ${isSelecting ? style.selectButtonsActive : ''}`}>
          <Button iconButton icon='selectall' onClickExecute={this.handleToggleAllMedia} />
          <Button iconButton icon='delete' onClickExecute={handleDeleteClick} iconColor='#e53935' />
        </div>
      </div>
    )
  }
})
