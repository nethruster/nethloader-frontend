import { h, Component } from 'preact'

import Button from '../button'
import Ink from 'react-ink'
import Icon from '../icon'
import { getPageFactor } from 'utils'
import { scrollBlockOff, scrollBlockOn } from 'preventScroll'

import style from './styles.scss'

export default class DropDownMenu extends Component {
  constructor (props) {
    super(props)

    this.state = { isOpen: false }

    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount () {
    this.pageFactor = getPageFactor(this.context.router)
  }

  handleClick () {
    this.setState({ isOpen: !this.state.isOpen })
    this.state.isOpen ? scrollBlockOn() : scrollBlockOff()
  }

  render ({ customIcon, navTrigger, centered, noMinWidth, localePageString }) {
    return (
      <div class='flex flex-full-center'>
        <div class={style.dropdownWrapper}>
          {
            navTrigger
              ? (
                <div
                  class={`flex flex-cross-center flex-dc ${
                    style.dropdownMenuNavButton} ${
                    style.dropdownMenuNavButtonCustom}`}
                  onClick={this.handleClick}>
                  <Ink />
                  <span class='flex'>
                    <Icon iconName='chev-down' />
                    <p>{localePageString}</p>
                  </span>
                  <b>{this.pageFactor + 1}</b>
                </div>
              )
              : <Button
                iconButton
                icon={`${customIcon || 'dots-menu'}`}
                onClickExecute={this.handleClick}
              />
          }
          <div
            class={`${style.dropdownMenu} ${
              centered
                ? style.dropdownMenuCentered
                : ''} ${
              noMinWidth
                ? style.dropdownMenuNoMinWidth
                : ''} ${
              this.state.isOpen
                ? style.active
                : ''}`}>
            <ul>
              {this.props.children}
            </ul>
          </div>
        </div>
        <div
          class={`${style.dropdownOverlay} ${this.state.isOpen ? style.active : ''}`}
          onClick={this.handleClick}
          style={navTrigger ? '' : { top: Math.round(window.pageYOffset) }}
        />
      </div>
    )
  }
}
