import { h, Component } from 'preact'

import style from './styles.scss'

export default class Checkbox extends Component {
  render ({ onChangeHandler, isSelected, text, id, customClass }) {
    return (
      <div class={`flex flex-full-center ${style.checkboxWrapper}`}>
        <input type='checkbox' id={id} onChange={onChangeHandler} checked={isSelected} />
        <label for={id} class={`flex flex-full-center ${customClass || ''}`}><div class={`flex flex-full-center ${style.checkbox}`} />{text && <p>{text}</p>}</label>
      </div>
    )
  }
}
