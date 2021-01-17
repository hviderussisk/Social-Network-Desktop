import { Button } from '@material-ui/core';
import React from 'react';
import { useStore } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AvatarState from '../../../avatar/avatar_state';
import c from './itemUsers.module.sass'


function ItemUsers(props) {

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
          <div>{props.followed ?
            <Button onClick={() => { props.unfollow(props.id) }} className={c.follow} color="primary" disabled size="small">Уже в друзьях</Button> : 
            props.request ? 
            <Button onClick={() => {  props.unfollow(props.id) }} className={c.follow} color="primary" variant="outlined" disabled size="small">Заявка отправлена</Button> : 
            <Button onClick={() => { props.follow({ idWho: idAuthProfile.profilePage.profileInfo.id, idWhom: props.id }) }} className={c.follow} color="primary" variant="outlined" size="small">Подписаться</Button>
          }
          </div>
        </div>
      </div>
    </div>
  );
}
export default ItemUsers;