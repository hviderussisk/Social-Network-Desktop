import React from 'react';
import ItemBlockComponent from '../itemblockcomponent/itemblockcomponent';
import p from './componentprofile.module.sass';

function ComponentProfile(props) {
  let Friends = props.friends.map(el=><ItemBlockComponent name={el.name} lastname={el.lastname} photo={el.photo} id={el.id} />)
  return (
    <div className={p.profile_left + ' ' + p.ui_block}>
      <div className={p.profile_friends}>
        <div className={p.header_top}>
          <span className={p.title}>Друзья</span>
          <span className={p.count}>{props.friends.length}</span>
        </div>
        {Friends}
      </div>
    </div>
  );
}

export default ComponentProfile;