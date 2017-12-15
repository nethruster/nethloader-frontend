import {h} from 'preact'

import {adminEmail} from 'app.config'

import style from './styles.scss'

import locale from 'locale'
const viewStrings = locale.shared.not_found

export default function NotFound () {
  return (
    <div class={`flex flex-full-center flex-dc ${style.notFound}`}>
      <p class='nomedia flex flex-full-center flex-dc'>
        <img height='275' width='500' src='/assets/img/sorry.gif' alt='Sorry gif' />
        <span class='flex flex-full-center'>{viewStrings.title}</span>
        <small>
          <a href={`mailto:${adminEmail}`}>{viewStrings.contact_admin}</a>
        </small>
      </p>
    </div>
  )
}
