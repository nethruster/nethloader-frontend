import { h } from 'preact'
import { connect } from 'preact-redux'

import SubheaderTabs from './tabs'

import style from './styles.scss'

const viewStrings = locale.cp.subheader // eslint-disable-line no-undef

function mapStateToProps (state) {
  const { userData } = state.userData
  const { totalCount } = state.userMedia

  return {
    userData,
    totalCount
  }
}

export default connect(mapStateToProps)(({ userData, totalCount }) => {
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
