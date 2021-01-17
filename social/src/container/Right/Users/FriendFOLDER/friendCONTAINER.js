import React from 'react';
import { connect } from 'react-redux';
import Friend from './friend';
import {deleteWathcerAC, agreeWatcherAC, getFriendWatcherAC, getRequestFriendWatcherAC, rejectWatcherAC, setIsProgressAC, watcherFOLLOWINGAC } from '../../../../redux/users-reducer';

class FriendsCont extends React.Component {
    componentDidMount() {
        this.props.getRequestFriendWatcher()
        this.props.getFriendWatcher()
    }
    render() {
        return <>
            <Friend delete={this.props.delete} friend={this.props.friend} request={this.props.requestFriendUsers} isProgress={this.props.isProgress} requestFriendUsers={this.props.requestFriendUsers} reject={this.props.reject} agree={this.props.agree} />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        requestFriendUsers: state.userPage.requestFriendUsers,
        friend: state.userPage.friend,
        pageNumber: state.userPage.pageNumber,
        isProgress: state.userPage.isProgress
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        follow: (obj) => {
            dispatch(watcherFOLLOWINGAC(obj))
        },
        getRequestFriendWatcher: () => {
            dispatch(getRequestFriendWatcherAC())
        },
        getFriendWatcher: () => {
            dispatch(getFriendWatcherAC())
        },
        setIsProgress: (boolean) =>{
            dispatch(setIsProgressAC(boolean))
        },
        agree: (data) => {
            dispatch(agreeWatcherAC(data))
        },
        reject: (data) => {
            dispatch(rejectWatcherAC(data))
        },
        delete: (data) => {
            dispatch(deleteWathcerAC(data))
        }
    }
}

let FriendContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsCont)

export default FriendContainer;
