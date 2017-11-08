import { h, Component } from 'preact'

import Icon from '../icon/'
import Spinner from '../spinner'

import mdripple from 'mdripple'

import style from './styles.scss'

export default class Button extends Component {
  componentDidMount () {
    mdripple(this.buttonEl)
  }

  render ({round, contrast, big, small, transparent, navButton, customClass, tabindex, type, onClickExecute, copyText, disabled, icon, spinner, spinnerColor, spinnerSize, text}) {
    /* eslint-disable no-lone-blocks */
    {
      /* You'll probably wonder why the fuck did I lay out the following class attribute like
       * this, don't panic, let me explain: It's to avoid generating line breaks on the rendered
       * component's class attr */
    }
    /* eslint-enable no-lone-blocks */
    return (
      <button
        class={`${style.button} ${
          round ? style.buttonRound : ''} ${
          contrast ? style.buttonContrast : ''} ${
          big ? style.buttonBig : ''} ${
          small ? style.buttonSmall : ''} ${
          transparent ? style.buttonTransparent : ''} ${
          navButton ? style.buttonNav : ''} ${
          customClass || ''} flex flex-full-center`}
        tabindex={tabindex}
        type={type}
        onClick={onClickExecute}
        data-copytext={copyText}
        disabled={disabled}
        ref={(el) => { this.buttonEl = el }}
        ripple='ripple'>
        {icon ? <Icon iconName={icon} /> : null}&nbsp;
        <p class='flex'>{spinner ? <Spinner color={spinnerColor} size={spinnerSize} /> : text}</p>
      </button>
    )
  }
}
