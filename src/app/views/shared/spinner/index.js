import {h} from 'preact'

import './styles.scss'

export default function Spinner ({size, color}) {
  return (
    <div class='spinner'>
      <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30' style={{ maxWidth: size }}>
        <circle style={{ stroke: color }} fill='none' cx='15' cy='15' r='14' />
      </svg>
    </div>
  )
}
