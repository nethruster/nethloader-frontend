import {h} from 'preact'

import './styles.scss'

// Notice me file-loader (●´ω｀●)
import '../../../../assets/img/logo.svg'

export default function Logo ({customClass}) {
  return (
    <div class={`logo ${customClass || ''}`}>
      <img src='../../../../assets/img/logo.svg' alt='Nethloader Logo' title='Nethloader Logo' />
    </div>
  )
}
