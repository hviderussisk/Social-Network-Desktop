import React from 'react'
import c from './friend.module.sass'
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavLink, Route, Switch } from 'react-router-dom';
import ItemReqUsers from '../itemReqUsers/itemReqUsers';
import ItemUsers from '../itemUsers/itemUsers';
import ItemFriend from '../itemFriend/itemFriend';



let SidebarMenu = (props) => {
    return <div className={c.sidebarMenu}>
        <NavLink to='/friend' exact activeClassName={c.active}> <div className={c.itemMenu}>Все друзья</div> </NavLink>
        <NavLink to='/friend/request' activeClassName={c.active}> <div className={c.itemMenu}>Заявки в друзья <span className={c.badge} style={props.request.length === 0 ? {display:'none'}:{display:'block'} }>{props.request ? props.request.length: false}</span></div> </NavLink>
    </div>
}

let HeaderFriend = (props) => {
    return <div className={c.headerContainer}>
            <ul className={c.ulMenu} onmouseover="uiTabs.tryInit(this)" >
                <li className={c.tabMenu}>
                    <a href="#" >
                        Все друзья<span className={c.count} dir="auto">{props.сountFriend.length}</span>
                    </a>
                </li>
                <li className={c.tabMenu}>
                    <a href="#" >
                        Друзья онлайн<span className={c.count} dir="auto"></span>
                    </a>
                </li>
            </ul>
            <NavLink to='/users'>
                <button className={c.buttonSearch}>Найти друзей</button>
            </NavLink>
    </div>
}

let Friend = (props) => {

    let requestFriendUsers = props.requestFriendUsers.map(user =>
        <ItemReqUsers reject={props.reject}
            agree={props.agree}
            key={user.id}
            id={user.id}
            name={user.name}
            lastname={user.lastname}
            photo={user.photo} />
    )

    let FriendUsers = props.friend.map(friend => 
        <ItemFriend  key={friend.id}
                delete={props.delete}
                id={friend.id}
                name={friend.name}
                lastname={friend.lastname}
                photo={friend.photo} />
    )
    return <div className={c.container_middle} >
        <Switch>
            <Route path="/friend/request" render={()=> <div className={c.lft + ' ' + c.ui_block}>
                <HeaderFriend сountFriend={props.friend}/>
                {requestFriendUsers}
                {props.isProgress == true ? <div className={c.preloader}><CircularProgress /></div> : null}
            </div> } />
            <Route path="/friend/" render={()=> <div className={c.lft + ' ' + c.ui_block}>
                <HeaderFriend сountFriend={props.friend} />
                
                {FriendUsers}
                {props.isProgress == true ? <div className={c.preloader}><CircularProgress /></div> : null}
            </div> } />
        </Switch>
        <div className={c.rght}>
            <div className={c.ui_block}>
                <SidebarMenu request={props.request} />
            </div>
        </div>
    </div >
}

export default Friend