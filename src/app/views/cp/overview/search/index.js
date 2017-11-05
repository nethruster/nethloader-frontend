import { h, Component } from 'preact'

import SearchDates from './search-dates'
import Checkbox from '../../../shared/checkbox'
import locale from 'locale'

import style from './styles.scss'

const viewStrings = locale.cp.overview.search

export default class Search extends Component {
  render ({onChangeHandler}) {
    return (
      <div class={`${style.search} flex flex-dc`}>
        <h3>{viewStrings.search_title}</h3>
        <div class='flex flex-sa'>
          <Checkbox id='img' text='Images' onChangeHandler={onChangeHandler} />
          <Checkbox id='video' text='Gif/Video' onChangeHandler={onChangeHandler} />
        </div>
        <SearchDates />
      </div>
    )
  }
}
