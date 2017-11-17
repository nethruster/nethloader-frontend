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

  componentWillMount () {
    this.bindClickToCustomTrigger()
  }

  handleClick () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  bindClickToCustomTrigger () {
    if (this.props.customTrigger) {
      this.props.customTrigger.attributes.onClick = this.handleClick
    }
  }

  render ({ customIcon, customTrigger, centered, noMinWidth }) {
    return (
      <div class='flex flex-full-center'>
        <div class={style.dropdownWrapper}>
          {customTrigger || <Button iconButton icon={`${customIcon || 'dots-menu'}`} onClickExecute={this.handleClick} />}
          <div class={`${style.dropdownMenu} ${centered ? style.dropdownMenuCentered : ''} ${noMinWidth ? style.dropdownMenuNoMinWidth : ''} ${this.state.isOpen ? style.active : ''}`}>
            <ul>
              {this.props.children}
            </ul>
          </div>
        </div>
        <div class={`${style.dropdownOverlay} ${this.state.isOpen ? style.active : ''}`} onClick={this.handleClick} style={{ top: Math.round(window.pageYOffset) }} />
      </div>
    )
  }
}
