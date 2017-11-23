import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import SubheaderTabs from './tabs'

import style from './styles.scss'

function mapStateToProps (state) {
  const {isFetchingUser, userData} = state.userData

  return {
    isFetchingUser,
    userData
  }
}

export default connect(mapStateToProps)(class Subheader extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return this.props.isFetchingUser !== nextProps.isFetchingUser
  }
  
  render ({isFetchingUser, userData}) {
    return (
      <div class={`${style.cpsubheader} flex flex-main-center`}>
        <div class={`${style.cpsubheaderWrapper} flex flex-cross-center flex-sb`}>
          <div class={style.cpsubheaderUserStats}>
            <p>{isFetchingUser ? 'Loading...' : userData.name}</p>
            <p>{isFetchingUser ? 'Loading...' : userData.email}</p>
          </div>
          <SubheaderTabs />
        </div>
      </div>
    )
  }
})
