import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import { getDataUserAC, setProfilePageAC, getAnotherDataUserAC, watcherGetPostAC } from '../../../redux/profile-reducer';
import { getFriendWatcherAC, getRequestFriendWatcherAC } from '../../../redux/users-reducer';
import { CircularProgress } from '@material-ui/core';

class ProfileCont extends React.Component {
    componentDidMount(){
        this.props.getRequestFriendWatcher()
        this.props.getFriendWatcher()
        let userId = this.props.match.params.id
        const obj = {id:userId}
        if( !userId ){
            userId = this.props.profileInfo.id
            this.props.getDataUser(obj)
        }else{
            this.props.getDataUser(obj)
        }
    }
    componentDidUpdate(prevProps) {
        if(this.props.match.params.id != prevProps.match.params.id){
            let userId = this.props.match.params.id
            const obj = {id:userId}
            this.props.getDataUser(obj)
        }
      }
    shouldComponentUpdate(){
        if(this.props.profileInfo.id ){
           return true 
        }else{
            return false
        }
    }
    render() {
        return <>
            { !this.props.profileInfo.id  ? <CircularProgress style={{position: 'absolute',margin: 'auto',left: 0,right: 0,top: '150px'}}/> : <Profile profileInfo={this.props.profileInfo }/> }
            </>
    }
}

let mapStateToProps = (state) => {
    return {
        profileInfo: state.profilePage.profileInfo,
        isProgress: state.profilePage.isProgress
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        setprofilePage: (data) =>{
            dispatch(setProfilePageAC(data))
        },
        getDataUser: (data) =>{
            dispatch(getDataUserAC(data))
        }, 
        getAnotherDataUser: (data) =>{
            dispatch(getAnotherDataUserAC(data))
        }, 
        getRequestFriendWatcher: () => {
            dispatch(getRequestFriendWatcherAC())
        },
        getFriendWatcher: () => {
            dispatch(getFriendWatcherAC())
        },
        GetPost: (data) => {
            dispatch(watcherGetPostAC(data))
        }
    }
}
let WithRouterProfileCont = withRouter(ProfileCont)
let ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(WithRouterProfileCont)

export default ProfileContainer;