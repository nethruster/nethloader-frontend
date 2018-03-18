import {h} from 'preact'

import style from './styles.scss'

// Notice me file-loader (●´ω｀●)
import '../../../../assets/img/sorry.gif'

const viewStrings = locale.shared.not_found // eslint-disable-line no-undef

export default function NotFound () {
  return (
    <div class={`flex flex-full-center flex-dc ${style.notFound}`}>
      <p class='nomedia flex flex-full-center flex-dc'>
        <img height='275' width='500' src='/assets/img/sorry.gif' alt='Sorry gif' />
        <span class='flex flex-full-center'>{viewStrings.title}</span>
        <small>
          <a href={`mailto:${adminEmail}`}>{viewStrings.contact_admin}</a> { /* eslint-disable-line no-undef */}
        </small>
      </p>
    </div>
  )
}
