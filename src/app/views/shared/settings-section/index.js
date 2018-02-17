import {h} from 'preact'
import {connect} from 'preact-redux'
import Ink from 'react-ink'

import Icon from '../icon'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {isTouchDevice} = state.html5video

  return {isTouchDevice}
}

export default connect(mapStateToProps)(({icon, isTouchDevice, title, currentText, currentData, onClickExecute, disabled, danger, hidden}) => {
  return (
    <div class={`flex flex-full-center flex-dc ${style.section} ${disabled ? style.sectionDisabled : ''} ${hidden ? style.sectionHidden : ''}`} onClick={onClickExecute}>
      <Ink />
      <h5 class={`flex flex-full-center ${style.sectionTitle}`} data-dangerbutton={danger}><Icon iconName={icon} />{title}</h5>
      <div class={`flex flex-cross-center flex-dc ${style.sectionContent}`}>
        <p>{currentText && `${currentText}:`} <span>{currentData}</span></p>
      </div>
    </div>

  )
})
