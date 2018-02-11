import {h} from 'preact'
import {Link} from 'react-router-dom'
import {connect} from 'preact-redux'

import Button from '../../../../shared/button'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {userData} = state.userData

  return {
    userData
  }
}

export default connect(mapStateToProps)(({userData}) => {
  return (
    <div class={style.section}>
      <div class='flex flex-cross-center'><Link to='/cp/settings'><Button customClass={style.backButton} iconButton icon='back' /></Link>&nbsp;<h3>Setting up ShareX</h3></div>
      <div class={style.sectionInfo}>
        <p>
          Nethloader is compatible with ShareX (Windows only application). It is an advanced and free application to take screenshots and record the screen while making the process of sharing easy.
        Setting up Nethloader with ShareX is really simple.
        </p>

        <p>
          In order to set up ShareX in with Nethloader, follow these instructions:
        </p>
        <ol>
          <li>Open ShareX and choose destinations on the left hand side of the window</li>
          <li>Choose destination settings</li>
          <li>Scroll down in the list on the left and select 'Custom uploaders'</li>
          <li>Click the 'Import' button and select 'From URL...'</li>
          <li>Paste the url shown below these instructions and click OK</li>
          <li>Check and see if the selected image uploader is 'Nethloader' and close the window</li>
          <li>In the main window of ShareX select destinations on the left hand side of the window, then select image uploader and click on 'Custom image uploader'</li>
        </ol>
      </div>
    </div>
  )
})
