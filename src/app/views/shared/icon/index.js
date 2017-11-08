import { h, Component } from 'preact'

import './styles.scss'

// Notice me file-loader (●´ω｀●)
import '../../../../assets/img/icons.svg'

export default class Button extends Component {
  shouldComponentUpdate () {
    return false
  }
  
  render ({iconName}) {
    const iconStyle = {
      fill: this.props.iconColor
    }

    return (
      <svg style={iconStyle} viewBox='0 0 24 24'><use xlinkHref={`../../../../assets/img/icons.svg#${iconName}`} /></svg>
    )
  }
}
