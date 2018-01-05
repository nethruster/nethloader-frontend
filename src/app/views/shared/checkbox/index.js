import {h} from 'preact'

import Ink from 'react-ink'

import style from './styles.scss'

export default function Checkbox ({onChangeHandler, isSelected, text, dataId, customClass, tabindex}) {
  return (
    <div class={`flex flex-full-center ${style.checkboxWrapper}`}>
      <input
        type='checkbox'
        id={dataId}
        data-id={dataId}
        onChange={onChangeHandler}
        checked={isSelected}
      />
      <label for={dataId} class={`flex flex-full-center ${customClass || ''}`} tabindex={tabindex}>
        <Ink />
        <div class={`flex flex-full-center ${style.checkbox}`} />
        {
          text && <p>{text}</p>
        }
      </label>
    </div>
  )
}
