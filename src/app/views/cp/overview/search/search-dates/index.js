import { h, Component } from 'preact'

import locale from 'locale'

import style from './styles.scss'

const viewStrings = locale.cp.overview.search.dates

export default class SearchDates extends Component {
  constructor (props) {
    super(props)

    this.state = {
      beforeDate: '',
      afterDate: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    let state = {
      ...this.state
    }

    state[event.target.id] = event.target.value

    this.setState({...state})
  }

  render () {
    return (
      <div class={`${style.searchDates} flex flex-dc flex-cross-center`}>
        <p>{viewStrings.between}</p>
        <input id='beforeDate' type='date' onChange={this.handleChange} />
        <p>{viewStrings.and}</p>
        <input id='afterDate' type='date' onChange={this.handleChange} />
      </div>
    )
  }
}
