import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {userData} = state.userData
  const {totalCount} = state.userMedia

  return {
    userData,
    totalCount
  }
}

export default connect(mapStateToProps)(class SettingsGrid extends Component {
  render ({userData, totalCount}) {
    return (
      <div class={style.gridContainer} />
    )
  }
})
