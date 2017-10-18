import { h, Component } from 'preact'

import Icon from '../../../shared/icon/icon.js'
import SearchDates from './search-dates/search-dates.js'

import style from './search.scss'

import locale from 'locale'

const viewStrings = locale.cp.overview.search

export default class Search extends Component {
  render () {
    return (
      <div class={`${style.search} flex flex-dc`}>
        <h3><Icon iconName='search' />{viewStrings.search_title}</h3>
        <div class={`${style.searchCheckbox} flex flex-sa`}>
          <input type='checkbox' id='box-1' />
          <label for='box-1'>{viewStrings.images}</label>
          <input type='checkbox' id='box-2' />
          <label for='box-2'>{viewStrings.gifs}</label>
        </div>
        <SearchDates />
      </div>
    )
  }
}
