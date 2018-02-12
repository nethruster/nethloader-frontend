import {h, Component} from 'preact'
import {NavLink} from 'react-router-dom'
import {copyToClipboard} from 'utils'
import {connect} from 'preact-redux'
import Button from '../../../shared/button'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {userData} = state.userData

  return {userData}
}

export default connect(mapStateToProps)(class Sidebar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      valueCopied: false
    }

    this.handleCopyClick = this.handleCopyClick.bind(this)
  }

  handleCopyClick (event) {
    copyToClipboard(event)

    this.setState({ valueCopied: !this.state.valueCopied })

    setTimeout(() => {
      this.setState({ valueCopied: !this.state.valueCopied })
    }, 1500)
  }
  
  render ({userData}) {
    return (
      <div class={`flex flex-dc ${style.sidebar}`}>
        <div class='flex flex-main-center flex-dc'>
          <h5>Uploading from software</h5>
          <p>
            Nethloader can be integrated with 3rd party services and software using an APIkey by which you can upload images to this account.
          </p>
          <p>
            The key can be used to upload media to this account directly and without authentication, be careful with it.
          </p>
          <div class={style.sidebarLinks}>
            <NavLink to='/cp/settings/sharex' activeClassName={style.activeSection}>
              <h6>ShareX</h6>
              <p>
                A free application for windows which works great when used with Nethloader.<br />
                <small>Click to read guide</small>
              </p>
            </NavLink>
            <NavLink to='/cp/settings/curl' activeClassName={style.activeSection}>
              <h6>cURL and others</h6>
              <p>
                It's also possible to upload files using cURL in your terminal on Mac and Linux systems.<br />
                <small>Click to read guide</small>
              </p>
            </NavLink>
          </div>
        </div>
        <div class='flex flex-dc flex-main-center'>
          <h6>Your APIKey</h6>
          <div class='flex flex-cross-center'>
            <code class='token'>{userData.apiKey}</code>
            <Button
              small
              text={this.state.valueCopied
                ? 'Copied!'
                : 'Copy'
              }
              copyText={`${userData.apiKey}`}
              onClickExecute={this.handleCopyClick}
            />
          </div>
        </div>
      </div>
    )
  }
})
