import { h, Component } from 'preact'

import style from './button.scss'
import Icon from '../icon/icon.js'
import Spinner from '../spinner/spinner.js'

export default class Button extends Component {
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
        onClick={this.props.onClickExecute}
        data-copytext={this.props.copyText}>
        {this.props.icon ? <Icon iconName={this.props.icon} /> : null}&nbsp;
        <p class='flex'>{this.props.spinner ? <Spinner color={this.props.spinnerColor} size={this.props.spinnerSize} /> : this.props.text}&nbsp;</p>
      </button>
    )
  }
}
