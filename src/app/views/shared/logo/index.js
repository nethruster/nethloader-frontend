import {h, Component} from 'preact'

import './styles.scss'

// Notice me file-loader (●´ω｀●)
import '../../../../assets/img/logo.svg'

export default class Logo extends Component {
  render ({customClass}) {
    return (
      <div class={`logo ${customClass || ''}`}>
        <img src='../../../../assets/img/logo.svg' alt='Nethloader Logo' />
      </div>
    )
  }
}
