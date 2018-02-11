import {h, Component} from 'preact'
import {Link} from 'react-router-dom'
import {connect} from 'preact-redux'

import Button from '../../../../shared/button'
import {copyToClipboard} from 'utils'
import {apiBaseUrl} from 'app.config'

import style from './styles.scss'

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
    return (
      <div class={style.section}>
        <div class='flex flex-cross-center'><Link to='/cp/settings'><Button customClass={style.backButton} iconButton icon='back' /></Link>&nbsp;<h3>Using cURL</h3></div>
        <div class={style.sectionInfo}>
          <p>
            You can upload files using cURL in your terminal on Mac and Linux.<br />
          </p>

          <div class={style.sectionInfo}>
            <div class={style.terminalWindow}>
              <header>
                <div class={`${style.terminalWindowButton} ${style.red}`} />
                <div class={`${style.terminalWindowButton} ${style.yellow}`} />
                <div class={`${style.terminalWindowButton} ${style.green}`} />
              </header>
              <section>
                <span class={style.terminalBlue}>{userData.name}</span>
                @<span class={style.terminalLightBlue}>nethloader_pc</span>&nbsp;
                <span class={style.terminalBlue}>$</span>&nbsp;
                {
                  `curl -X POST \\
                  ${apiBaseUrl.replace('graphql', 'api')} \\
                  -H 'api-key: ${userData.apiKey}' \\
                  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \\
                  -F 'file=@/absolute/path/to/file'`.split('\n').map((line, key) => <span key={key}>{line}<br /></span>) // If you see this, don't()
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
