import { h, Component } from 'preact'

import style from './styles.scss'

export default class FormInput extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return this.props.validationMessage !== nextProps.validationMessage
  }

  render ({inputId, inputType, inputState, inputLabel, required, changeHandler, noValidationStyle, autofocus, validationMessage}) {
    return (
      <div class='input-container flex flex-dc'>
        <input id={inputId}
          class={`${style.inputClass} ${inputState}`}
          name={inputId}
          type={inputType}
          placeholder={inputLabel}
          required={required}
          onInput={changeHandler}
          noValidationStyle={noValidationStyle}
          title={inputLabel}
          autofocus={autofocus} />
        <label for={inputId}>{validationMessage}</label>
      </div>
    )
  }
}
