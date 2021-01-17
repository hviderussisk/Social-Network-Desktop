import React from 'react';
import { connect } from 'react-redux';
import InfoProfile from './infoprofile';

let mapStateToProps = (state) => {
    
    return {
        state: state.profilePage.dataAnotherUser ? state.profilePage.dataAnotherUser : state.profilePage.profileInfo,
        countPubl:  state.profilePage.postData,
        friends: state.userPage.friend
    }
}
let mapStateToDispatch = (dispatch) => {
    return {

    }
}

let infoprofileContainer = connect(mapStateToProps, mapStateToDispatch)(InfoProfile)
export default infoprofileContainer