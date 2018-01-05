import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import Modal from '../../../../shared/modal'
import {deleteUser} from 'serverAPI/settings'
import {logoutUser} from 'serverAPI/authentication'

const mapStateToProps = (state) => {
  const {token, sessionData} = state.authentication
  const {isFetching} = state.settings

  return {
    token,
    sessionData,
    isFetching
  }
}

export default connect(mapStateToProps)(class DeleteUserAccountModal extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    this.props.dispatch(deleteUser(this.props.sessionData.id, this.props.token)).then(() => {
      this.props.toggleModal()
      this.props.dispatch(logoutUser())
    })
  }

  render ({isActive, toggleModal, isFetching}) {
    return (
      <Modal
        isActive={isActive}
        disabled={isFetching}
        toggleModal={toggleModal}
        modalTitle='Delete media'
        closeButtonText='Wait, no'
        acceptButtonText='I know, proceed'
        onAcceptExecute={this.handleSubmit}>
        <p class='flex flex-full-center'>This will delete ALL your uploaded media AND your account, which will be innaccesible thereafter.</p>
        <p class='flex flex-full-center danger-text'>IT CANNOT BE UNDONE.</p>
      </Modal>
    )
  }
})
