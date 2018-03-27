import { h, Component } from 'preact'
import { NavLink } from 'react-router-dom'
import { copyToClipboard } from 'utils'
import { connect } from 'preact-redux'
import Button from '../../../shared/button'
import Icon from '../../../shared/icon'

import style from './styles.scss'

const viewStrings = locale.cp.settings.sidebar // eslint-disable-line no-undef

const mapStateToProps = (state) => {
  const { userData } = state.userData

  return { userData }
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

  render ({ userData }) {
    return (
      <div class={`flex flex-dc ${style.sidebar}`}>
        <div class='flex flex-main-center flex-dc'>
          <h5>{viewStrings.title}</h5>
          <p>
            {viewStrings.description}
          </p>
          <div class={style.sidebarLinks}>
            <NavLink to='/cp/settings/sharex' activeClassName={style.activeSection}>
              <h6>{viewStrings.nav_links.sharex.title}</h6>
              <p>
                {viewStrings.nav_links.sharex.description}<br />
                <small>{viewStrings.nav_links.click_to_read}</small>
              </p>
            </NavLink>
            <NavLink to='/cp/settings/curl' activeClassName={style.activeSection}>
              <h6>{viewStrings.nav_links.curl.title}</h6>
              <p>
                {viewStrings.nav_links.curl.description}<br />
                <small>{viewStrings.nav_links.click_to_read}</small>
              </p>
            </NavLink>
          </div>
        </div>
        <div class='flex flex-dc flex-main-center'>
          <h6>{viewStrings.api_key.title}</h6>
          <div class='flex flex-cross-center'>
            <code class='token'>{userData.apiKey}</code>
            <Button
              small
              text={this.state.valueCopied
                ? viewStrings.api_key.apikey_copied
                : viewStrings.api_key.copy_apikey
              }
              copyText={`${userData.apiKey}`}
              onClickExecute={this.handleCopyClick}
            />
          </div>
          <p class={`danger-text ${style.warning}`}>
            <Icon iconName='warning' /> {viewStrings.api_key.no_auth_security_warning}
          </p>
          <p class={`${style.warning}`}>
            <Icon iconName='info' /> {viewStrings.api_key.compromised_apikey_info}
          </p>
        </div>
      </div>
    )
  }
})
