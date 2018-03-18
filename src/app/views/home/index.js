import {h} from 'preact'

import Button from '../shared/button'
import Logo from '../shared/logo'
import Footer from '../shared/footer'

import style from './styles.scss'

const viewStrings = locale.home // eslint-disable-line no-undef

export default function Home () {
  return (
    <div class={`${style.home} flex flex-full-center flex-dc`}>
      <div class='flex flex-cross-center flex-dc'>
        <Logo customClass={style.homeLogo} />
        <p class={`${style.homeText} ta-c`}>{viewStrings.intro}</p>
      </div>
      <div class={`${style.homeButtons} flex flex-full-center flex-sa`}>
        <a rel='noopener' target='_blank'>
          <Button transparent icon='info' text={viewStrings.buttons.more_info} />
        </a>
        <a href='https://github.com/nethruster/nethloader' rel='noopener' target='_blank'>
          <Button transparent icon='github' text={viewStrings.buttons.source_code} />
        </a>
      </div>
      <Footer />
    </div>
  )
}
