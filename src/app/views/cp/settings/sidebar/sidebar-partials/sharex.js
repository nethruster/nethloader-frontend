import {h, Component} from 'preact'
import {Link} from 'react-router-dom'
import {connect} from 'preact-redux'

import {copyToClipboard} from 'utils'
import Button from '../../../../shared/button'
import Icon from '../../../../shared/icon'

import style from './styles.scss'

const viewStrings = locale.cp.settings.sidebar.partials.sharex // eslint-disable-line no-undef

const mapStateToProps = (state) => {
  const {userData} = state.userData

  return {
    userData
  }
}

export default connect(mapStateToProps)(class SharexPartial extends Component {
  constructor (props) {
    super(props)

    this.state = { valueCopied: false }

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
      <div class={style.section}>
        <div class='flex flex-cross-center'><Link to='/cp/settings'><Button customClass={style.backButton} iconButton icon='back' /></Link>&nbsp;<h3>Setting up ShareX</h3></div>
        <div class={style.sectionInfo}>
          <p>
            {viewStrings.description}
          </p>

          <p>
            {viewStrings.instructions_title}:
          </p>
          <ol>
            {Object.values(viewStrings.instructions).map(value => {
              return <li>{value}</li>
            })}
          </ol>
        </div>
        <p class={`danger-text ${style.warning}`}>
          <Icon iconName='warning' /> {viewStrings.autoconfigure_security_warning}
        </p>
        <span class='flex flex-full-center'>
          <code class='token'>
            <a href={`${window.location.origin}/sharex?apikey=${userData.apiKey}`} rel='noopener' target='_blank'>
              {window.location.origin}/sharex?{userData.apiKey}
            </a>
          </code>
          <Button
            small
            text={this.state.valueCopied
              ? viewStrings.autoconfig_copied
              : viewStrings.copy_autoconfig
            }
            copyText={`${window.location.origin}/sharex?apikey=${userData.apiKey}`}
            onClickExecute={this.handleCopyClick}
          />
        </span>
      </div>
    )
  }
})
