import React from 'react';
import c from './Right.module.sass'
import { Route, Switch} from 'react-router-dom'
import UserContainer from './Users/usersContainer';
import NewsContainer from './News/newsContainer';
import { CircularProgress } from '@material-ui/core';
import { Suspense } from 'react';
import { lazy } from 'react';
import FriendContainer from './Users/FriendFOLDER/friendCONTAINER.js';
const Chat= lazy(() => import('./Chat/chat'))
const ProfileContainer = lazy(() => import('./Profile/ProfileContainer'))

function Right(props) {
  return (
    <div className={c.container_right}>
      <Switch>
          <Route path='/profile/:id' render={()=> <Suspense fallback={<CircularProgress style={{position: 'absolute',margin: 'auto',left: 0,right: 0,top: '150px'}}/>}> <ProfileContainer props={{}}/> </Suspense>}/>
          <Route path='/chat/' render={()=> <Suspense fallback={<CircularProgress style={{position: 'absolute',margin: 'auto',left: 0,right: 0,top: '150px'}} />}>  <Chat/> </Suspense>}/>
          <Route path='/users/' render={()=> <UserContainer/>}/>
          <Route path='/friend' render={()=> <FriendContainer/>}/>
          <Route path='/news/' render={()=> <NewsContainer/>}/>
          <Route path='/' strict render={()=> <Suspense fallback={<CircularProgress style={{position: 'absolute',margin: 'auto',left: 0,right: 0,top: '150px'}}/>}> <ProfileContainer props={{}}/> </Suspense>}/>
      </Switch>
    </div>
  );
}

export default Right;

