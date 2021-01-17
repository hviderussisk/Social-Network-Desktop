import Axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects'
import { REG_USER } from './auth-reducer';
import { addPostAC, dataUserAC, deletePostAC, DELETE_POST_WATCHER, 
     GET_DATA_USER, newLikeActionCreator, postData, POST_AUTH, POST_COMMENT, 
      POST_LIKE, POST_POST, setAvatarAC, UPLOAD_AVATAR, WATCHER_CHANGE_POST, 
      WATCHER_DELETE_PHOTO, deletePhotoAC, GetPostAC, WATCHER_GET_POST, setAvatarMiniAC, UPLOAD_MINIATURE } from './profile-reducer'
import { agreeAC, AGREE_WATCHER, deleteAC, DELETE_FRIEND_WATCHER, followAC, FOLLOWING, FRIEND, getFriendAC, getRequestFriendAC, rejectAC, REJECT_WATCHER, REQUEST_FRIEND } from './users-reducer'



export function fetchPostLoad(data) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: data,
        url: '/addcomment',
    };
    return Axios(options)
        .then(res => res.data)
}
function* workerPostLoad(action) {
    const res = yield call(fetchPostLoad, action.obj)
    yield put(postData(res))
}



export function fetchAddPost(data) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: data,
        url: '/addpost',
    };
    return Axios(options)
        .then(res => {
            return res.data
        })
}
function* workerAddPost(action) {
    const res = yield call(fetchAddPost, action.obj)
    yield put(addPostAC(res))
}



export function fetchAddLike(data) {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: data,
        url: '/addLike',
    };
    return Axios(options)
        .then(res => {
            return res.data
        })
        .catch(err=>{
            return err
        })
}
function* workerAddLike(action) {
    const res = yield call(fetchAddLike, action.obj)
    yield put(newLikeActionCreator(res))
}


export function fetchAuthUser(data) {
    let axios = Axios.create({
        withCredentials: true
      })
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: data,
        url: '/auth',
    };
    return axios(options)
    .then(res=>{
        return JSON.parse(JSON.stringify(res.data))
    })
    .catch(err=>{
        return err
    })
}

export function fetchGetDataUser(data) {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    let axios = Axios.create({
        withCredentials: true
    })
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: data,
        url: '/api/getDataUser',
    };
    return axios(options)
    .then(res=>{
        return JSON.parse(JSON.stringify(res.data))
    })
    .catch(err=>{
        return err
    })
}


function* workerAuthUser(action) {
    const res = yield call(fetchAuthUser, action.obj)
    try {
        if(!res.response){
            localStorage.setItem('token',res)
            yield put({type:GET_DATA_USER})
        }else{
            throw new Error()
        }
    } catch (error) {
        if(res.response.data){
            yield put({ type:'ERROR_AUTH', obj: res })
        }
    }
}


function* workerGetDataUser(action) {
    const dataUser = yield call(fetchGetDataUser, action.obj? action.obj : null)
    const data = yield call(fetchGetPost, dataUser.id)
    try {
        if(!dataUser.response){
            yield put(dataUserAC(dataUser))
            yield put(GetPostAC(data))
        }else{
            throw new Error()
        }
    } catch (error) {
        yield put({ type:'ERROR_AUTH', obj: dataUser} )
    }
}


export function fetchUploadAvatar(image) {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    let axios = Axios.create({withCredentials: true})
    const options = {method: 'POST', headers: { 'Content-Type': 'application/json' }, data: image , url: '/uploadavatar', };
    return axios(options).then(res=>{ return JSON.parse(JSON.stringify(res.data)) }).catch(err=>{ return err})
}

function * workerUploadAvatar(action){
    const photo = yield call(fetchUploadAvatar, action.obj)
    yield put(setAvatarAC(photo))
}


export function fetchUploadAvatarMini(image) {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    let axios = Axios.create({withCredentials: true})
    const options = {method: 'POST', headers: { 'Content-Type': 'application/json' }, data: image , url: '/uploadavatarMini', };
    return axios(options).then(res=>{ return JSON.parse(JSON.stringify(res.data)) }).catch(err=>{ return err})
}

function * workerUploadAvatarMini(action){
    const photo = yield call(fetchUploadAvatarMini, action.obj)
    yield put(setAvatarMiniAC(photo))
}


export function fetchFollowing(data) {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    let axios = Axios.create({withCredentials: true})
    const options = {method: 'POST', headers: { 'Content-Type': 'application/json' }, data: data , url: '/follow', };
    return axios(options).then(res=>{ return JSON.parse(JSON.stringify(res.data)) }).catch(err=>{ return err})
}
function * workerFollowing(action){
    const isFollow = yield call(fetchFollowing, action.obj)
    yield put(followAC(isFollow))
}


export function fetchRequestFriend(data) {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    let axios = Axios.create({withCredentials: true})
    const options = {method: 'POST', headers: { 'Content-Type': 'application/json' }, data: data , url: '/api/friends/request', };
    return axios(options).then(res=>{ return JSON.parse(JSON.stringify(res.data)) }).catch(err=>{ return err})
}
function * workerRequestFriend(action){
    const data = yield call(fetchRequestFriend, action.obj)
    yield put(getRequestFriendAC(data))
}


export function fetchFriend(data) {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    let axios = Axios.create({withCredentials: true})
    const options = {method: 'POST', headers: { 'Content-Type': 'application/json' }, data: data , url: '/api/friends', };
    return axios(options).then(res=>{ return JSON.parse(JSON.stringify(res.data)) }).catch(err=>{ return err})
}
function * workerFriend(action){
    const data = yield call(fetchFriend, action.obj)
    yield put(getFriendAC(data))
}




export function fetchAgree(data) {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    let axios = Axios.create({withCredentials: true})
    const options = {method: 'POST', headers: { 'Content-Type': 'application/json' }, data: data , url: '/agreeFriend', };
    return axios(options).then(res=>{ return JSON.parse(JSON.stringify(res.data)) }).catch(err=>{ return err})
}
function * workerAgree(action){
    const data = yield call(fetchAgree, action.data)
    yield put(agreeAC(data))
}



export function fetchReject(data) {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    let axios = Axios.create({withCredentials: true})
    const options = {method: 'POST', headers: { 'Content-Type': 'application/json' }, data: data , url: '/rejectFriend', };
    return axios(options).then(res=>{ return JSON.parse(JSON.stringify(res.data)) }).catch(err=>{ return err})
}
function * workerReject(action){
    const data = yield call(fetchReject, action.data)
    yield put(rejectAC(data))
}


export function fetchDelete(data) {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    let axios = Axios.create({withCredentials: true})
    const options = {method: 'POST', headers: { 'Content-Type': 'application/json' }, data: data , url: '/deleteFriend', };
    return axios(options).then(res=>{ return JSON.parse(JSON.stringify(res.data)) }).catch(err=>{ return err})
}


function * workerDelete(action){
    const data = yield call(fetchDelete, action.data)
    yield put(deleteAC(data))
}


export function fetchDeletePost(data) {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    let axios = Axios.create({withCredentials: true})
    const options = {method: 'POST', headers: { 'Content-Type': 'application/json' }, data: data , url: '/deletePost', };
    return axios(options).then(res=>{ return JSON.parse(JSON.stringify(res.data)) }).catch(err=>{ return err})
}

function * workerDeletePost(action){
    const data = yield call(fetchDeletePost, action.obj)
    yield put(deletePostAC(data))
}


export function fetchChangePost(data) {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    let axios = Axios.create({withCredentials: true})
    const options = {method: 'POST', headers: { 'Content-Type': 'application/json' }, data: data , url: '/changePost', };
    return axios(options).then(res=>{ return JSON.parse(JSON.stringify(res.data)) }).catch(err=>{ return err})
}
function * workerChangePost(action){
    const data = yield call(fetchChangePost, action.obj)
}

export function fetchDeleteAvatar() {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    let axios = Axios.create({withCredentials: true})
    const options = {method: 'POST', headers: { 'Content-Type': 'application/json' }, data: null , url: '/deletePhoto', };
    return axios(options).then(res=>{ return JSON.parse(JSON.stringify(res.data)) }).catch(err=>{ return err})
}
function * workerDeleteAvatar(action){
    const data = yield call(fetchDeleteAvatar)
    yield put(deletePhotoAC(data))
}


export function fetchGetPost(data) {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    let axios = Axios.create({withCredentials: true})
    const options = {method: 'GET', headers: { 'Content-Type': 'application/json' }, data: null , url: `/api/posts/?id=${data}`, };
    return axios(options).then(res=>{ return JSON.parse(JSON.stringify(res.data)) }).catch(err=>{ return err})
}
function * workerGetPost(action){
    const data = yield call(fetchGetPost, action.obj)
    yield put(GetPostAC(data))
}
export function fetchRegUSER(data) {
    let axios = Axios.create({withCredentials: true})
    const options = {method: 'POST', headers: { 'Content-Type': 'application/json' }, data: data , url: `/addUser`, };
    return axios(options).then(res=>{ return JSON.parse(JSON.stringify(res.data)) }).catch(err=>{ return err})
}
function * workerRegUSER(action){
    const data = yield call(fetchRegUSER, action.obj)
    //yield put(AddUserAC(data))
}

export function* watchPostLoad() {
    yield takeEvery(POST_COMMENT, workerPostLoad)
    yield takeEvery(POST_POST, workerAddPost)
    yield takeEvery(POST_LIKE, workerAddLike)
    yield takeEvery(POST_AUTH, workerAuthUser)
    yield takeEvery(REG_USER, workerRegUSER)
    yield takeEvery(GET_DATA_USER, workerGetDataUser)
    yield takeEvery(WATCHER_GET_POST, workerGetPost)
    yield takeEvery(UPLOAD_AVATAR, workerUploadAvatar)
    yield takeEvery(UPLOAD_MINIATURE, workerUploadAvatarMini)
    yield takeEvery(FOLLOWING , workerFollowing)
    yield takeEvery(REQUEST_FRIEND , workerRequestFriend)
    yield takeEvery(FRIEND , workerFriend)
    yield takeEvery(AGREE_WATCHER , workerAgree)
    yield takeEvery(REJECT_WATCHER , workerReject)
    yield takeEvery(DELETE_FRIEND_WATCHER , workerDelete)
    yield takeEvery(DELETE_POST_WATCHER , workerDeletePost)
    yield takeEvery(WATCHER_CHANGE_POST , workerChangePost)
    yield takeEvery(WATCHER_DELETE_PHOTO , workerDeleteAvatar)
}


export function fetchDeletComment(data){
    Axios.delete('/api/comments/delete?id='+data)
}