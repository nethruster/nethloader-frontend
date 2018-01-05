import {h} from 'preact'
import {connect} from 'preact-redux'
import Ink from 'react-ink'

import Icon from '../../../../shared/icon'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {isTouchDevice} = state.html5video

  return {isTouchDevice}
}

export default connect(mapStateToProps)(({icon, isTouchDevice, title, currentText, currentData, dataCopy, onClickExecute, disabled, danger}) => {
  return (
    <div class={`flex flex-full-center flex-dc ${style.section} ${disabled ? style.sectionDisabled : ''}`} data-copytext={dataCopy} onClick={onClickExecute}>
      <Ink />
      <h5 class={`flex flex-full-center ${style.sectionTitle}`} data-dangerbutton={danger}><Icon iconName={icon} />&nbsp;{title}</h5>
      <div class={`flex flex-cross-center flex-dc ${style.sectionContent}`}>
        <p>{currentText && `${currentText}:`} <span>{currentData}</span></p>
      </div>
    </div>

  )
})
