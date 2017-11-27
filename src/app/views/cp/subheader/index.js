import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import SubheaderTabs from './tabs'

import style from './styles.scss'

function mapStateToProps (state) {
  const {isFetchingUser, userData} = state.userData
  const {totalCount} = state.userMedia

  return {
    isFetchingUser,
    userData,
    totalCount
  }
}

export default connect(mapStateToProps)(class Subheader extends Component {
  render ({isFetchingUser, userData, totalCount}) {
    return (
      <div class={`${style.cpsubheader} flex flex-main-center`}>
        <div class={`${style.cpsubheaderWrapper} flex flex-cross-center flex-sb`}>
          <div class={style.cpsubheaderUserStats}>
            <p>{userData.name}</p>
            <p>{`${totalCount} media items`}</p>
          </div>
          <SubheaderTabs />
        </div>
      </div>
    )
  }
})
