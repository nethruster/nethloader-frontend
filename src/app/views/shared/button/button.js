import { h, Component } from 'preact'
import {CopyToClipboard} from 'react-copy-to-clipboard'

import style from './button.scss'
import Icon from '../icon/icon.js'
import Spinner from '../spinner/spinner.js'

export default class Button extends Component {
  constructor (props) {
    super(props)

    this.state = {
      copy: {
        valueCopied: false
      }
    }

    this.handleValueCopied = this.handleValueCopied.bind(this)
  }

  handleValueCopied () {
    let copy = {
      ...this.state.copy
    }

    copy.valueCopied = true
    this.setState({copy})

    setTimeout(() => {
      copy.valueCopied = false
      this.setState({copy})
    }, 2000)
  }

  render () {
    if (this.props.copyText) {
      return (
        <CopyToClipboard text={this.props.copyText} onCopy={this.handleValueCopied}>
          <button
            class={`${style.button}
                  ${this.props.round ? style.buttonRound : ''}
                  ${this.props.contrast ? style.buttonContrast : ''}
                  ${this.props.big ? style.buttonBig : ''}
                  ${this.props.small ? style.buttonSmall : ''}
                  ${this.props.transparent ? style.buttonTransparent : ''}
                  ${this.props.navButton ? style.buttonNav : ''}
                  ${this.props.customClass ? this.props.customClass : ''}
                  flex flex-full-center` }
            tabindex={this.props.tabindex}
            onClick={this.props.onClickExecute}>
            {this.props.icon ? <Icon iconName={this.props.icon} /> : null}&nbsp;
            <p class='flex'>{this.props.spinner ? <Spinner color={this.props.spinnerColor} size={this.props.spinnerSize} /> : this.state.copy.valueCopied ? 'Copied!' : this.props.text}&nbsp;</p>
          </button>
        </CopyToClipboard>
      )
    } else {
      return (
        <button
          class={`${style.button}
                ${this.props.round ? style.buttonRound : ''}
                ${this.props.contrast ? style.buttonContrast : ''}
                ${this.props.big ? style.buttonBig : ''}
                ${this.props.small ? style.buttonSmall : ''}
                ${this.props.transparent ? style.buttonTransparent : ''}
                ${this.props.navButton ? style.buttonNav : ''}
                ${this.props.customClass ? this.props.customClass : ''}
                flex flex-full-center` }
          tabindex={this.props.tabindex}
          onClick={this.props.onClickExecute}>
          {this.props.icon ? <Icon iconName={this.props.icon} /> : null}&nbsp;
          <p class='flex'>{this.props.spinner ? <Spinner color={this.props.spinnerColor} size={this.props.spinnerSize} /> : this.props.text}&nbsp;</p>
        </button>
      )
    }
  }
}
