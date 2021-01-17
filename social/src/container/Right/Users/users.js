import React from 'react'
import ItemUsers from './itemUsers/itemUsers'
import c from './users.module.sass'
import Search from '../../search/search';
import CircularProgress from '@material-ui/core/CircularProgress';

let Users = (props) => {
    let userList = props.usersData.map(user =>  
            <ItemUsers unfollow={props.unfollow} 
                        follow={props.follow} 
                        followed={user.followed} 
                        key={user.id} 
                        id={user.id} 
                        name={user.name}
                        lastname={user.lastname} 
                        photo={user.photo}
                        request={user.request} />
    )
    return < div className={c.container_middle} >
        <div className={c.lft}>
            {userList}
            {props.isProgress == true ? <div className={c.preloader}><CircularProgress /></div> : null }
        </div>
        <div className={c.rght}>
            
        </div>
    </div >
}

export default Users