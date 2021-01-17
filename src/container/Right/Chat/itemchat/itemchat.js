import React from 'react';
import AvatarWithAvatar from '../../../avatar/avatar_with_avatar';
import c from './itemchat.module.sass'


function Itemchat(props) {
    return (
        <div className={c.itemchat+' '+c.ui_block}>
            <div><AvatarWithAvatar/></div>
            <div className={c.infoblock}>
                <div className={c.name}>
                    <a href="#" title="">Илья</a>
                </div>
                <div className={c.preview}>
                    <div className={c.infopreview}>Здаров, пиши проект.</div>
                </div>
            </div>
        </div>
    );
}
export default Itemchat;