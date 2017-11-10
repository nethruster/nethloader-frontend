import { h, Component } from 'preact'

import SearchDates from './search-dates'
import Checkbox from '../../../shared/checkbox'
import Icon from '../../../shared/icon'
import locale from 'locale'

import style from './styles.scss'

const viewStrings = locale.cp.overview.search

export default class Search extends Component {
  render ({toggleSidebar}) {
    return (
      <div class={`${style.search} flex flex-dc`}>
        <h3 onClick={toggleSidebar}>{viewStrings.search_title}&nbsp;<Icon iconName='chev-down' /></h3>
        <div class='flex flex-sa'>
          <Checkbox dataId='img' text='Images' />
          <Checkbox dataId='video' text='Gif/Video' />
        </div>
        <SearchDates />
      </div>
    )
  }
}
