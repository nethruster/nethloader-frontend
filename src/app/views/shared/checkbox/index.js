import {h, Component} from 'preact'

import Ink from 'react-ink'

import style from './styles.scss'

export default class Checkbox extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return this.props.isSelected !== nextProps.isSelected
  }

  render ({onChangeHandler, isSelected, text, dataId, customClass}) {
    return (
      <div class={`flex flex-full-center ${style.checkboxWrapper}`}>
        <input type='checkbox' id={dataId} data-id={dataId} onChange={onChangeHandler} checked={isSelected} />
        <label for={dataId} class={`flex flex-full-center ${customClass || ''}`}>
          <Ink />
          <div class={`flex flex-full-center ${style.checkbox}`} />
          {text && <p>{text}</p>}
        </label>
      </div>
    )
  }
}
