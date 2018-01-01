import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import Modal from '../../../shared/modal'
import {deleteAllUserImages} from 'serverAPI/settings'
import {getUserMedia} from 'serverAPI/data'

const mapStateToProps = (state) => {
  const {token, sessionData} = state.authentication

  return {
    token,
    sessionData
  }
}

export default connect(mapStateToProps)(class DeleteAllMediaModal extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    this.props.dispatch(deleteAllUserImages(this.props.sessionData.id, this.props.token)).then(() => {
      this.props.toggleModal()
      this.props.dispatch(getUserMedia(this.props.sessionData.id, this.props.token, {}))
    })
  }

  render ({isActive, toggleModal}) {
    return (
      <Modal
        isActive={isActive}
        toggleModal={toggleModal}
        modalTitle='Delete media'
        closeButtonText='Wait, no'
        acceptButtonText='I know, proceed'
        onAcceptExecute={this.handleSubmit}>
        <p class='flex flex-full-center'>This will delete ALL your uploaded media since you created the account.</p>
        <p class='flex flex-full-center danger-text'>THIS CANNOT BE UNDONE.</p>
      </Modal>
    )
  }
})
