import React from 'react';
import c from './Profile.module.sass'
import ProfileAvatar from './profileavatar/profileavatar';
import ComponentProfileContainerUsersFollowed from './componentprofile/ComponentProfileContainer';
import PostListContainer from './PostList/postlistContainer';
import InfoProfileContainer from './infoprofile/infoprofileContainer';


  function Profile(props) {

    return (
      <div className={c.container_middle}> 
          <div className={c.lft}>
            <ProfileAvatar photo={props.profileInfo.photo} myAccount={props.profileInfo.myPage}/> 
            <ComponentProfileContainerUsersFollowed/> 
          </div>     
          <div className={c.rght}>
            <InfoProfileContainer props={props}/>
            <PostListContainer  myAccount={props.profileInfo.myPage}/>
          </div>     
      </div>
    );
  }
export default Profile;