// TODO: remove DayPicker

import { h, Component } from 'preact'
import moment from 'moment'
import DayPickerInput from 'react-day-picker/DayPickerInput'

import style from './search-dates.scss'

import locale from 'locale'

const viewStrings = locale.cp.overview.search.dates

export default class SearchDates extends Component {
  constructor (props) {
    super(props)

    this.state = {
      beforeDay: undefined,
      afterDay: undefined
    }

    this.DAY_FORMAT = 'DD/MM/YYYY'

    this.handleBeforeDayChange = this.handleBeforeDayChange.bind(this)
    this.handleAfterDayChange = this.handleAfterDayChange.bind(this)
  }

  handleBeforeDayChange (beforeDay, modifiers) {
    this.setState({
      beforeDay
    })
  };

  handleAfterDayChange (afterDay, modifiers) {
    this.setState({
      afterDay
    })
  };

  render () {
    const formattedBeforeDay = this.state.beforeDay ? moment(this.state.beforeDay).format(this.DAY_FORMAT) : ''
    const formattedAfterDay = this.state.afterDay ? moment(this.state.afterDay).format(this.DAY_FORMAT) : ''

    return (
      <div class={`${style.searchDates} flex flex-dc`}>
        <p>{viewStrings.between}</p>
        <DayPickerInput
          value={formattedAfterDay}
          onDayChange={this.handleAfterDayChange}
          format={this.DAY_FORMAT}
          placeholder={this.DAY_FORMAT}
          dayPickerProps={{todayButton: viewStrings.go_to_today}}
        />
        <p>{viewStrings.and}</p>
        <DayPickerInput
          value={formattedBeforeDay}
          onDayChange={this.handleBeforeDayChange}
          format={this.DAY_FORMAT}
          placeholder={this.DAY_FORMAT}
          dayPickerProps={{todayButton: viewStrings.go_to_today}}
        />
      </div>
    )
  }
}
