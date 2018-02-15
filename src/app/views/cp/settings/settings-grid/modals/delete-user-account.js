import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import Modal from '../../../../shared/modal'
import {deleteUser} from 'serverAPI/settings'
import {logoutUser} from 'serverAPI/authentication'

import locale from 'locale'

const viewStrings = locale.cp.settings.settings_grid.partials.account_remove

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
        modalTitle={viewStrings.title}
        closeButtonText={viewStrings.cancel}
        acceptButtonText={viewStrings.accept}
        onAcceptExecute={this.handleSubmit}>
        <p class='flex flex-full-center'>{viewStrings.description}</p>
        <p class='flex flex-full-center danger-text'>{viewStrings.warning}</p>
      </Modal>
    )
  }
})
