import React from 'react';
import c from './chat.module.sass'
import Itemchat from './itemchat/itemchat';


  function Chat(props) {
    return (
      <div className={c.container_middle}> 
          <div className={c.lft}>
                <Itemchat />
                <Itemchat />
                <Itemchat />
                <Itemchat />
                <Itemchat />
                <Itemchat />
                <Itemchat />
                <Itemchat />
                <Itemchat />
          </div>     
          <div className={c.rght}>
            <div className={c.ui_block}></div>
          </div>     
      </div>
    );
  }
export default Chat;