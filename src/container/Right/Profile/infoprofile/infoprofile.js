import React from 'react';
import p from './infoprofile.module.sass';

function InfoProfile(props) {
  let countPubl = props.countPubl.length

  return (
    <div className={p.profile_right}>
            <div className={p.profile_info+' '+p.ui_block}>
              <div className={p.profile_name}>
                <p>{props.state.name+' '+props.state.lastname}</p>
                <div className={p.online}>Online</div>
              </div>
              <div className={p.profile_specific}>Graphic Designer at Self Employed</div>
              <div className={p.geo}>г. Лида, Гроденская область, Беларусь</div>
              <div className={p.сontacts}><span>Контакты</span> </div>
              <div className={p.email}><span>Элекронная почта: </span> {props.state.email}</div>
              <div className={p.profile_follow}>
                {/* <div className={p.following}>
                  <p className={p.count}>155</p>
                  <p>Подписки</p>
                </div> */}
                <div className={p.followers}>
                  <p className={p.count}>{props.friends.length}</p>
                  <p>Друзья</p>
                </div>
                <div className={p.publication}>
                  <p className={p.count}>{countPubl}</p>
                  <p>Публикаций</p>
                </div>
                {/* <div className={p.respect}>
                  <p className={p.count}>11</p>
                  <p>Респектов</p>
                </div> */}
              </div>
            </div>
          </div>
  );
}

export default InfoProfile;

