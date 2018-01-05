import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import Modal from '../../../../shared/modal'
import {renewUserApiKey} from 'serverAPI/settings'
import {getUserData} from 'serverAPI/data'

const mapStateToProps = (state) => {
  const {token, sessionData} = state.authentication

  return {
    token,
    sessionData
  }
}

export default connect(mapStateToProps)(class ApiKeyModal extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    this.props.dispatch(renewUserApiKey(this.props.sessionData.id, this.props.token)).then(() => {
      this.props.toggleModal()
      this.props.dispatch(getUserData(this.props.sessionData.id, this.props.token))
    })
  }

  render ({isActive, toggleModal}) {
    return (
      <Modal
        isActive={isActive}
        toggleModal={toggleModal}
        modalTitle='Regenerate APIKey'
        closeButtonText='Wait, no'
        acceptButtonText='Regenerate'
        onAcceptExecute={this.handleSubmit}>
        <p class='flex flex-full-center'>Any app set up with your current key will stop working after this.</p>
        <p class='flex flex-full-center danger-text'>THIS CANNOT BE UNDONE.</p>
      </Modal>
    )
  }
})
