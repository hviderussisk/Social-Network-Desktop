import { Button } from '@material-ui/core';
import React from 'react';
import { useStore } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AvatarState from '../../../avatar/avatar_state';
import c from './itemReqUsers.module.sass'
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

function ItemReqUsers(props) {

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
            <Button onClick={() => { props.agree({id:props.id}) }} className={`${c.follow} ${c.agree}`} color="primary" variant="outlined" size="small"><DoneIcon/></Button>
            <Button onClick={() => { props.reject({id:props.id}) }} className={`${c.follow} ${c.reject}`} color="primary" variant="outlined" size="small"><ClearIcon/></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ItemReqUsers;