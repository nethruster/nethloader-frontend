import { h, Component } from 'preact'

import style from './button.scss'
import Icon from '../icon/icon.js'
import Spinner from '../spinner/spinner.js'

import mdripple from 'mdripple'

export default class Button extends Component {
  componentDidMount () {
    mdripple(this.buttonEl)
  }

  render () {
    return (
      <button
        class={`${style.button} ${
              this.props.round ? style.buttonRound : ''} ${
              this.props.contrast ? style.buttonContrast : ''} ${
              this.props.big ? style.buttonBig : ''} ${
              this.props.small ? style.buttonSmall : ''} ${
              this.props.transparent ? style.buttonTransparent : ''} ${
              this.props.navButton ? style.buttonNav : ''} ${
              this.props.customClass ? this.props.customClass : ''}
              flex flex-full-center` }
        tabindex={this.props.tabindex}
        type={this.props.type}
        onClick={this.props.onClickExecute}
        data-copytext={this.props.copyText}
        disabled={this.props.disabled}
        ref={(el) => { this.buttonEl = el }}
        ripple='ripple'>
        {this.props.icon ? <Icon iconName={this.props.icon} /> : null}&nbsp;
        <p class='flex'>{this.props.spinner ? <Spinner color={this.props.spinnerColor} size={this.props.spinnerSize} /> : this.props.text}</p>
      </button>
    )
  }
}
