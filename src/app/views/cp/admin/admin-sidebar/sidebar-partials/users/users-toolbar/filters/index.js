import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import './styles.scss'

const mapStateToProps = (state) => {
  const { isFetchingUsers, uData } = state.users
  const { allToggled, selectedUsers } = state.userSelect

  return {
    isFetchingUsers,
    uData,
    allToggled,
    selectedUsers
  }
}

export default connect(mapStateToProps)(class Filters extends Component {
  render ({handleDeleteClick}) {
    return (
      <div class={`flex flex-cross-center flex-sb`}>
        Search
      </div>
    )
  }
})
