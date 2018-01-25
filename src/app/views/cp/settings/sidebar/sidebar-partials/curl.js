import {h, Component} from 'preact'
import {Link} from 'react-router-dom'
import {connect} from 'preact-redux'

import Button from '../../../../shared/button'
import {copyToClipboard} from 'utils'

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
                <div class={`${style.terminalWindowButton} ${style.green}`} />
                <div class={`${style.terminalWindowButton} ${style.yellow}`} />
                <div class={`${style.terminalWindowButton} ${style.red}`} />
              </header>
              <section>
                <span class={style.terminalBlue}>{userData.name}</span>
                @<span class={style.terminalLightBlue}>potato_pc</span>&nbsp;
                <span class={style.terminalBlue}>$</span>&nbsp;
                {`comming soon...`}<span class={style.cursor} />
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
