import { h, Component } from 'preact'

import Icon from '../icon/'
import Spinner from '../spinner'
import Ink from 'react-ink'

import style from './styles.scss'

export default class Button extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return (this.props.disabled !== nextProps.disabled) ||
           (this.props.spinner !== nextProps.spinner) ||
           (this.props.icon !== nextProps.icon) ||
           (this.props.text !== nextProps.text)
  }

  render ({dataId, round, contrast, big, small, transparent, navButton, dropdown, floating, iconButton, customClass, tabindex, type, onClickExecute, copyText, disabled, icon, iconColor, spinner, spinnerColor, spinnerSize, text}) {
    /* eslint-disable no-lone-blocks */
    {
      /* You'll probably wonder why the fuck did I lay out the following class attribute like
       * this, don't panic, let me explain: It's to avoid generating line breaks on the rendered
       * component's class attr */
    }
    /* eslint-enable no-lone-blocks */
    return (
      <button
        data-id={dataId}
        class={`flex flex-full-center ${style.button} ${
          round ? style.buttonRound : ''} ${
          contrast ? style.buttonContrast : ''} ${
          big ? style.buttonBig : ''} ${
          small ? style.buttonSmall : ''} ${
          transparent ? style.buttonTransparent : ''} ${
          navButton ? style.buttonNav : ''} ${
          dropdown ? style.buttonDropdown : ''} ${
          floating ? style.buttonFloating : ''} ${
          iconButton ? style.buttonIcon : ''} ${
          customClass || ''}`}
        tabindex={tabindex}
        type={type}
        onClick={onClickExecute}
        data-copytext={copyText}
        disabled={disabled}
        ref={(el) => { this.buttonEl = el }}
        ripple='ripple'>
        <Ink />
        {icon && !spinner ? <Icon iconName={icon} iconColor={iconColor} /> : null}&nbsp;
        {(spinner || text) && <p class='flex'>{spinner ? <Spinner color={spinnerColor} size={spinnerSize} /> : text}</p>}
      </button>
    )
  }
}
