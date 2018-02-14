import {h, Component} from 'preact'
import {Link} from 'react-router-dom'
import {connect} from 'preact-redux'
import {copyToClipboard} from 'utils'
import Button from '../../../../shared/button'
import Icon from '../../../../shared/icon'

import style from './styles.scss'

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
          Nethloader is compatible with ShareX (Windows only application). It is an advanced and free application to take screenshots and record the screen while making the process of sharing easy.
        Setting up Nethloader with ShareX is really simple.
          </p>

          <p>
          In order to set up ShareX in with Nethloader, follow these instructions:
          </p>
          <ol>
            <li>Open ShareX and choose destinations on the left hand side of the window</li>
            <li>Choose destination settings</li>
            <li>Scroll down in the list on the left and select 'Custom uploaders'</li>
            <li>Click the 'Import' button and select 'From URL...'</li>
            <li>Paste the url shown below these instructions and click OK</li>
            <li>Check and see if the selected image uploader is 'Nethloader' and close the window</li>
            <li>In the main window of ShareX select destinations on the left hand side of the window, then select image uploader and click on 'Custom image uploader'</li>
          </ol>
        </div>
        <span class='flex flex-full-center'>
          <code class='token'>
            <a href={`${window.location.origin}/sharex?apikey=${userData.apiKey}`} rel='noopener' target='_blank'>
              {window.location.origin}/sharex?{userData.apiKey}
            </a>
          </code>
          <Button
            small
            text={this.state.valueCopied
              ? 'Copied!'
              : 'Copy URL'
            }
            copyText={`${window.location.origin}/sharex?apikey=${userData.apiKey}`}
            onClickExecute={this.handleCopyClick}
          />
        </span>
        <p class={`danger-text ${style.warning}`}>
          <Icon iconName='warning' /> This url is used to auto-configure ShareX to upload media to this account directly and without authentication, do not share it.
        </p>
      </div>
    )
  }
})
