import React from 'react';
import { useStore } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AvatarState from '../../../avatar/avatar_state';
import c from './itemFriend.module.sass'
import ClearIcon from '@material-ui/icons/Clear';

function ItemFriend(props) {

  let idAuthProfile = useStore()
  idAuthProfile = idAuthProfile.getState()

  let name = `${props.name} ${props.lastname}`
  return (
    <div className={c.container_middle}>
      <div className={c.itemuser}>
        <i className="material-icons">star</i>
        <NavLink to={'/profile/' + props.id}>
          <div>
            <AvatarState name={props.name} photo={props.photo} />
          </div>
        </NavLink>
        <div className={c.contentblock}>
          <div>
            <p>{name}</p>
            <p className={c.geo}>{props.geo}</p>
          </div>
          <div>
            <button onClick={() => { props.delete({id:props.id}) }} className={`${c.delete}`}><ClearIcon/></button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ItemFriend;