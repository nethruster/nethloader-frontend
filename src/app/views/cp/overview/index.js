import { h, Component } from 'preact'

import Uploads from './uploads'
import Search from './search'

import style from './styles.scss'

export default class Overview extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isSidebarActive: false
    }

    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  toggleSidebar () {
    this.setState({isSidebarActive: !this.state.isSidebarActive})
  }

  render () {
    return (
      <div class={`${style.overview} flex`}>
        <Uploads />
        {/* <div class={`${style.sidebar} ${this.state.isSidebarActive ? style.sidebarActive : ''}`}>
          <Search toggleSidebar={this.toggleSidebar} />
        </div> */}
      </div>
    )
  }
}
