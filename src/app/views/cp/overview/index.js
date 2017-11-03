import { h, Component } from 'preact'

import Uploads from './uploads'
import Search from './search'

import style from './styles.scss'

export default class Overview extends Component {
  render () {
    return (
      <div class={`${style.overview} flex`}>
        <Uploads />
        <div class={style.sidebar}>
          <Search />
        </div>
      </div>
    )
  }
}
