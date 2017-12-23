import {h} from 'preact'

import style from './styles.scss'

export default function FormInputRadio ({
  inputName,
  inputLabel,
  inputValue,
  inputId,
  isChecked,
  changeHandler
}) {
  return (
    <div class={`flex ${style.formRadioInput}`}>
      <input
        id={inputId}
        name={inputName}
        value={inputValue}
        type='radio'
        checked={isChecked}
        onChange={changeHandler}
      />
      <label for={inputId}>{inputLabel}</label>
    </div>
  )
}
