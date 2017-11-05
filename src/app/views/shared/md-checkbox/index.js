import { h, Component } from 'preact'

import './styles.scss'

export default class MdCheckbox extends Component {
  render ({ toggleSelect, isSelected }) {
    return (
      <label className='flex flex-full-center'>
        <input type='checkbox' onChange={toggleSelect} checked={isSelected} />
        <span className='md__checkbox-material'><span className='md__checkbox-check' /></span>
      </label>
    )
  }
}
