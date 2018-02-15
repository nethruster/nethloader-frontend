import {h, Component} from 'preact'
import {Link} from 'react-router-dom'
import {connect} from 'preact-redux'
import Ink from 'react-ink'

import Button from '../../../../shared/button'
import {copyToClipboard} from 'utils'
import {apiBaseUrl} from 'app.config'

import style from './styles.scss'

import locale from 'locale'

const viewStrings = locale.cp.settings.sidebar.partials.curl

const mapStateToProps = (state) => {
  const {userData} = state.userData

  return {userData}
}

export default connect(mapStateToProps)(class CurlPartial extends Component {
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
    const curlCommand = `curl -X POST \\
                  ${apiBaseUrl.replace('graphql', 'api')} \\
                  -H 'api-key: ${userData.apiKey}' \\
                  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \\
                  -F 'file=@/absolute/path/to/file'`
    return (
      <div class={style.section}>
        <div class='flex flex-cross-center'><Link to='/cp/settings'><Button customClass={style.backButton} iconButton icon='back' /></Link>&nbsp;<h3>Using cURL</h3></div>
        <div class={style.sectionInfo}>
          <p>
            {viewStrings.description}<br />
            {viewStrings.usage_description} <code>/absolute/path/to/file</code>.
          </p>

          <div class={style.sectionInfo}>
            <div class={style.terminalWindow}>
              <header class='flex flex-cross-center flex-sb'>
                <div>
                  <div class={`${style.terminalWindowButton} ${style.red}`} />
                  <div class={`${style.terminalWindowButton} ${style.yellow}`} />
                  <div class={`${style.terminalWindowButton} ${style.green}`} />
                </div>
                <button data-copytext={curlCommand} onClick={this.handleCopyClick} class='flex flex-full-center'>
                  <Ink />{this.state.valueCopied ? viewStrings.command_copied : viewStrings.copy_command}</button>
              </header>
              <section>
                <span class={style.terminalBlue}>{userData.name}</span>
                @<span class={style.terminalLightBlue}>{viewStrings.terminal_hostname}</span>&nbsp;
                <span class={style.terminalBlue}>$</span>&nbsp;
                {
                  // If you see this, don't()
                  curlCommand.split('\n').map((line, key) => <span key={key}>{line}<br /></span>)
                }
                <span class={style.cursor} />
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
