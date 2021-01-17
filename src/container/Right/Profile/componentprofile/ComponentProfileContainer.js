import React from 'react';
import { FollowingProfileUsersAC } from './../../../../redux/profile-reducer'
import ComponentProfile from './../componentprofile/componentprofile';
import { connect } from 'react-redux';
import * as axios from 'axios'

class UsersProfileFollowed extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=6&friend=true`).then(response => {
            this.props.setUsers(response.data.items)
        })
    }
    render() {
        return <>
            <ComponentProfile friends={this.props.friends} followedUsers={this.props.usersData}/>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        usersData: state.profilePage.usersData,
        friends: state.userPage.friend,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        setUsers: (data) => {
            dispatch(FollowingProfileUsersAC(data))
        }
    }
}

let ComponentProfileContainerUsersFollowed = connect(mapStateToProps, mapDispatchToProps)(UsersProfileFollowed)

export default ComponentProfileContainerUsersFollowed;
