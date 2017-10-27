import { h, Component } from 'preact'

import style from './form-input.scss'

export default class FormInput extends Component {
  render () {
    return (
      <div class='input-container flex flex-dc'>
        <input id={this.props.inputId}
          class={`${style.inputClass} ${this.props.inputState}`}
          type={this.props.inputType}
          placeholder={this.props.inputLabel}
          required={this.props.required}
          onInput={this.props.changeHandler}
          noValidationStyle={this.props.noValidationStyle}
          title={this.props.inputLabel} />
        <label for={this.props.inputId}>{this.props.validationMessage}</label>
      </div>
    )
  }
}
