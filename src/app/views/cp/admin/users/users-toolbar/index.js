import {h} from 'preact'

import SelectUserControls from './select-controls'
import AddUser from './add-user'

import style from './styles.scss'

export default function ({handleDeleteClick}) {
  return (
    <div class={`flex flex-dc ${style.usersToolbar}`}>
      <div class={`flex flex-cross-center ${style.usersToolbarSelect}`}>
        {/* <Filters /> */}
        <div class='flex flex-full-center'>
          <AddUser />
          <SelectUserControls handleDeleteClick={handleDeleteClick} />
        </div>
      </div>
    </div>
  )
}
