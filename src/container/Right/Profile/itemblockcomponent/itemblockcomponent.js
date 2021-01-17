import React from 'react';
import { NavLink } from 'react-router-dom';
import p from './itemblockcomponent.module.sass';

function ItemBlockComponent(props) {
    return (
    <div className={p.body}>
          <div className={p.row}>
            <div className={p.cell}>
              <NavLink to={'/profile/' + props.id}>
                <img className={p.avatar} src={props.photo.image} alt={props.name+' '+props.lastname}></img>
              </NavLink>
              <div className={p.name}>
                <a href="#" title="">{props.name}</a>
              </div>
            </div>
          </div>
        </div>
  );
}

export default ItemBlockComponent;