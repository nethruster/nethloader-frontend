import { h, Component } from 'preact'

import Button from '../button'

import style from './styles.scss'

export default class DropDownMenu extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({isOpen: !this.state.isOpen})
  }

  render () {
    return (
      <div class='flex flex-full-center'>
        <div class={style.dropdownWrapper}>
          <Button iconButton icon='dots-menu' onClickExecute={this.handleClick} />
          <div class={`${style.dropdownMenu} ${this.state.isOpen ? style.active : ''}`}>
            <ul>
              {this.props.children}
            </ul>
          </div>
        </div>
        <div class={`${style.dropdownOverlay} ${this.state.isOpen ? style.active : ''}`} onClick={this.handleClick} />
      </div>
    )
  }
}
