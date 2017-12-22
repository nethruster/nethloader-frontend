import {h} from 'preact'

import './styles.scss'

export default function Spinner ({size, color}) {
  return (
    <div class='loader'>
      <svg class='circular' viewBox='25 25 50 50' style={{ width: size }}>
        <circle style={{ stroke: color }} class='path' cx='50' cy='50' r='20' fill='none' stroke-width='2' stroke-miterlimit='10' />
      </svg>
    </div>
  )
}
