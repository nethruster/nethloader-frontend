import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import Icon from '../../../shared/icon'
import Button from '../../../shared/button'
import {copyToClipboard} from 'utils'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {userData, isFetchingUser} = state.userData

  return {
    userData,
    isFetchingUser
  }
}

export default connect(mapStateToProps)(class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      copy: { valueCopied: false }
    }

    this.handleCopyClick = this.handleCopyClick.bind(this)
  }

  handleCopyClick (event) {
    copyToClipboard(event)

    let copy = {...this.state.copy}

    copy.valueCopied = true
    this.setState({ copy })

    setTimeout(() => {
      copy.valueCopied = false
      this.setState({ copy })
    }, 1500)
  }

  render ({userData, isFetchingUser}) {
    return (
      <div class={`flex flex-dc ${style.sidebar}`}>
        <div class='flex flex-main-center flex-dc'>
          <h6><Icon iconName='info' />&nbsp;Integration</h6>
          <small>The  APIkey can be used to upload media to this <br />account directly, be careful with it.</small>
        </div>
      </div>
    )
  }
})
