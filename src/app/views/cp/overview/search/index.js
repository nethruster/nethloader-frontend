import { h, Component } from 'preact'
import Icon from '../../../shared/icon'
import SearchDates from './search-dates'

import locale from 'locale'

import style from './styles.scss'

const viewStrings = locale.cp.overview.search

export default class Search extends Component {
  render () {
    return (
      <div class={`${style.search} flex flex-dc`}>
        <h3>{viewStrings.search_title}</h3>
        <div class={`${style.searchCheckbox} flex flex-sa`}>
          <input type='checkbox' id='box-1' />
          <label for='box-1'>{viewStrings.image}</label>
          <input type='checkbox' id='box-2' />
          <label for='box-2'>{viewStrings.video}</label>
        </div>
        <div class='flex flex-dc flex-full-center'>
          <p>By ID</p>
          <input type='text' placeholder='ID' />
        </div>
        <SearchDates />
      </div>
    )
  }
}
