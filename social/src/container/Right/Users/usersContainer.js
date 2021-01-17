import React from 'react';
import { followAC, unfollowAC, setUsersAC, currentPageAC, setNewUsersAC, setIsProgressAC, watcherFOLLOWINGAC } from './../../../redux/users-reducer'
import Users from './users';
import { connect } from 'react-redux';
import * as axios from 'axios'

class UsersCont extends React.Component {
    componentDidMount() {
        this.props.setIsProgress(true)
        axios.post('/api/users/').then(response => {
            this.props.setIsProgress(false)

            this.props.setUsers(response.data)
        })
    }
    render() {
        return <>
            <Users isProgress={this.props.isProgress} usersData={this.props.usersData} unfollow={this.props.unfollow} follow={this.props.follow} setNewUsers={this.setNewUsers} />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        usersData: state.userPage.usersData,
        pageNumber: state.userPage.pageNumber,
        isProgress: state.userPage.isProgress
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        follow: (obj) => {
            dispatch(watcherFOLLOWINGAC(obj))
        },
        unfollow: (UserId) => {
            dispatch(watcherFOLLOWINGAC(UserId))
        },
        setUsers: (data) => {
            dispatch(setUsersAC(data))
        },
        currentPage: () => {
            dispatch(currentPageAC())
        },
        setNewUsers: (data) => {
            dispatch(setNewUsersAC(data))
        },
        setIsProgress: (boolean) =>{
            dispatch(setIsProgressAC(boolean))
        }
    }
}

let UserContainer = connect(mapStateToProps, mapDispatchToProps)(UsersCont)

export default UserContainer;
