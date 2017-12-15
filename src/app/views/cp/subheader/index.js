import {h} from 'preact'
import {connect} from 'preact-redux'

import SubheaderTabs from './tabs'

import style from './styles.scss'

import locale from 'locale'
const viewStrings = locale.cp.subheader

function mapStateToProps (state) {
  const {isFetchingUser, userData} = state.userData
  const {totalCount} = state.userMedia

  return {
    isFetchingUser,
    userData,
    totalCount
  }
}

export default connect(mapStateToProps)(({isFetchingUser, userData, totalCount}) => {
  return (
    <div class={`${style.cpsubheader} flex flex-main-center`}>
      <div class={`${style.cpsubheaderWrapper} flex flex-cross-center flex-sb`}>
        <div class={style.cpsubheaderUserStats}>
          <p>{userData.name}</p>
          <p>{`${totalCount} ${viewStrings.media_items}`}</p>
        </div>
        <SubheaderTabs />
      </div>
    </div>
  )
})
