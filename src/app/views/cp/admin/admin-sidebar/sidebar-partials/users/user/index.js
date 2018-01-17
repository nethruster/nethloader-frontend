import {h, Component} from 'preact'
import {connect} from 'preact-redux'
import {Link} from 'react-router-dom'

import Checkbox from '../../../../../../shared/checkbox'
import Button from '../../../../../../shared/button'
import UserButtons from './buttons'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {selectedUsers} = state.userSelect
  const {sessionData} = state.authentication

  return {
    selectedUsers,
    sessionData
  }
}

export default connect(mapStateToProps)(class User extends Component {
  render ({itemData, selectedUsers, handleToggleUser, sessionData, toggleDeleteConfirmModal}) {
    return (
      <li
        style={style}
        class={style.userRow}
        key={itemData.id}>
        <span class={`flex flex-cross-center ${style.userRowField} ${style.userRowFieldId}`}>
          <p>{itemData.id}</p>
        </span>
        <span class={`flex flex-cross-center ${style.userRowField}`}>
          <p>{itemData.name}</p>
        </span>
        <span class={`flex flex-cross-center ${style.userRowField} ${style.userRowFieldEmail}`}>
          <p>{itemData.email}</p>
        </span>
        <span class={`flex flex-full-center ${style.userRowField} ${style.userRowFieldIcon}`}>
          <p>{itemData.isAdmin ? <span class={style.adminBadge}>Admin</span> : ''}</p>
        </span>
        {itemData.id === sessionData.id && itemData.isAdmin
          ? {}
          : <span class={`flex flex-full-center ${style.userRowField} ${style.userRowFieldIcon} ${style.userRowFieldIconInteractive}`}>
            <Checkbox
              onChangeHandler={handleToggleUser}
              isSelected={selectedUsers.includes(itemData.id)}
              dataId={itemData.id}
              customClass={style.selectButton}
            />
          </span>
        }
        {itemData.id === sessionData.id && itemData.isAdmin
          ? <span class={`flex flex-full-center ${style.userRowField} ${style.userRowFieldIcon} ${style.userRowFieldIconInteractive}`}>
            <Link to='/cp/settings'><Button iconButton icon='settings' /></Link>
          </span>
          : <UserButtons
            itemData={itemData}
            handleToggleUser={handleToggleUser}
            toggleDeleteConfirmModal={toggleDeleteConfirmModal}
          />
        }
      </li>
    )
  }
})
