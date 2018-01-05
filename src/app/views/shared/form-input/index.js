import {h, Component} from 'preact'

import './styles.scss'

export default class FormInput extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return this.props.validationMessage !== nextProps.validationMessage
  }

  render ({
    inputId,
    inputType,
    inputState,
    inputLabel,
    required,
    changeHandler,
    noValidationStyle,
    autofocus,
    validationMessage,
    tabindex
  }) {
    return (
      <div class='input-container flex flex-dc'>
        <input
          id={inputId}
          class={`${inputState || ''}`}
          name={inputId}
          type={inputType}
          placeholder={inputLabel}
          required={required}
          onInput={changeHandler}
          noValidationStyle={noValidationStyle}
          title={inputLabel}
          tabindex={tabindex}
          autofocus={autofocus}
        />
        <label for={inputId}>{validationMessage}</label>
      </div>
    )
  }
}
