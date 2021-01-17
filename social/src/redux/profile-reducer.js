export let ADD_POST = 'ADD_POST'
export let GET_POST = 'GET_POST'
export let WATCHER_GET_POST = 'WATCHER_GET_POST'
export let POST_POST = 'POST_POST'
export let GET_DATA_USER = 'GET_DATA_USER'
export let GET_ANOTHER_DATA_USER = 'GET_ANOTHER_DATA_USER'
export let POST_USER = 'POST_USER'
export let POST_AUTH = 'POST_AUTH'
export let DATA_USER = 'DATA_USER'
export let DATA_ANOTHER_USER = 'DATA_ANOTHER_USER'
export let UPLOAD_AVATAR = 'UPLOAD_AVATAR'
export let UPLOAD_MINIATURE = 'UPLOAD_MINIATURE'
export let SET_AVATAR = 'SET_AVATAR'
export let SET_AVATAR_MINI = 'SET_AVATAR_MINI'
export let WATCHER_DELETE_PHOTO = 'WATCHER_DELETE_PHOTO'
export let DELETE_PHOTO = 'DELETE_PHOTO'
export let ERROR_AUTH = 'ERROR_AUTH'

export let NEW_LIKE = 'NEW-LIKE'
export let POST_LIKE = 'POST_LIKE'
export let NEW_TEXT_TEXTAREA = 'NEW-TEXT-TEXTAREA'
export let FOLLOWIN_USERS = 'FOLLOWIN_USERS'
export let setProfilePage = 'SET_PROFILE_PAGE'
export let NEW_TEXT_TEXTAREA_COMMENT = 'NEW-TEXT-TEXTAREA-COMMENT'

export let POST_DATA = 'POST_DATA'
export let DELETE_POST_WATCHER = 'DELETE_POST_WATCHER'
export let WATCHER_CHANGE_POST = 'WATCHER_CHANGE_POST'
export let CHANGE_POST = 'CHANGE_POST'
export let DELETE_POST = 'DELETE_POST'
export let GET_DATA_COMMENT = 'GET_DATA_COMMENT'
export let DELETE_COMMENT = 'DELETE_COMMENT'
export let POST_COMMENT = 'POST_COMMENT'

let initialState = {
    postData: [
        {
            id: 1, 
            timePost: '20.10.2020',
            name: 'Ilya Myshko', 
            info:'Lorem ipsum dolor sit amet',
            comment: [],
            likeList: [],
            share: [],
            liked: false
        }
    ],
    newPostText : '',
    followingUsers : [],
    profileInfo : null,
    newPostTextComment : '' ,
    session: false,
    isProgress: true
}

let profileReducer = ( state = initialState, action ) => {
    let stateCopy
    switch(action.type){
        case ERROR_AUTH:
            return {
                ...state,
                session: false,
                isProgress: false
            }
        case SET_AVATAR:
            return {
                ...state,
                profileInfo: {...state.profileInfo, photo: action.obj}
            }
        case SET_AVATAR_MINI:
            return {
                ...state,
                profileInfo: {...state.profileInfo, photomini: action.obj}
            }
        case DELETE_PHOTO:
            return {
                ...state,
                profileInfo: {...state.profileInfo, photo: null}
            }
        case DELETE_POST:
            return {
                ...state,
                postData: state.postData.filter(el=> el.id !== action.obj.idPost )
            }
        case DATA_USER:
            stateCopy = {
                ...state,
                profileInfo: action.obj, session: true, isProgress: false, postData: []
            }
            stateCopy.profileInfo.myPage && ( stateCopy.myid = stateCopy.profileInfo.id)
            return stateCopy
        case GET_DATA_USER:
            return {
                ...state,
                postData: [],
                profileInfo: {}
            }
        case FOLLOWIN_USERS: 
            return {
                ...state,
                followingUsers: action.data
            }
        case ADD_POST :{
            stateCopy = {
                ...state,
                postData: [...state.postData]
            }
            stateCopy.postData.push(action.obj)
            return stateCopy
        }
        case GET_POST :{
            stateCopy = {
                ...state,
                postData: []
            }
            action.obj.map(el=>stateCopy.postData.push(el))
            for(let elem of stateCopy.postData){
                for(let elemTwo of  elem.likeList){
                    if(elemTwo.idUser === state.myid){
                        elem.liked = true
                    }
                }
            }
            return stateCopy
        }
        case NEW_LIKE: {
            stateCopy = {
                ...state,
                postData:[...state.postData]
            }

            let i = stateCopy.postData.findIndex( item => item.id === action.obj.idPost)
            stateCopy.postData[i].likeList = [...stateCopy.postData[i].likeList]

            if(!stateCopy.postData[i].liked){
                stateCopy.postData[i].liked = true                
                stateCopy.postData[i].likeList.push(action.obj)
            }else{
                stateCopy.postData[i].liked = false
                let liklist = stateCopy.postData[i].likeList.filter( item => item.idUser !== action.obj.idUser)
                stateCopy.postData[i].likeList = []
                liklist.map( item => stateCopy.postData[i].likeList.push(item))
            }
            return stateCopy
        }
        case NEW_TEXT_TEXTAREA:{
            stateCopy = { ...state}
            stateCopy.newPostText = action.text
            return stateCopy
        }
        case NEW_TEXT_TEXTAREA_COMMENT:{
            return {
                ...state,
                newPostTextComment: action.text
            }
        }
        case POST_DATA:{  
            stateCopy = {
                ...state,
                postData: [...state.postData],
                newPostTextComment: ''
            }
            let i = stateCopy.postData.findIndex( item => item.id === action.obj.idPost)
            stateCopy.postData[i].comment = [...state.postData[i].comment]
            stateCopy.postData[i].comment.push(action.obj)
            return stateCopy
        }
        case DELETE_COMMENT:{
            stateCopy = {
                ...state,
                postData: [...state.postData]
            }
            for( let i = 0; i<state.postData.length; i++ ){
                stateCopy.postData[i].comment = [...state.postData[i].comment]
            }
            let i = stateCopy.postData.findIndex( item => item.id === action.obj.post)
            let comments = stateCopy.postData[i].comment.filter( el=> action.obj.id !== el.id )
            stateCopy.postData[i].comment = []
            comments.map( el => stateCopy.postData[i].comment.push(el))
            return stateCopy
        }
        default:
            return state 
            
    } 
}

export let FollowingProfileUsersAC = (users_following_array_in_profile) => {return { type: FOLLOWIN_USERS, data: users_following_array_in_profile }} 
export let setProfilePageAC = (data) => { return {type: setProfilePage, data: data}}
export let updateTextareaActionCreator = (text) => { return { type: 'NEW-TEXT-TEXTAREA', text: text }} 
export let updateTextareaCommentActionCreator = (text) => {return { type: 'NEW-TEXT-TEXTAREA-COMMENT', text: text }} 
export let GetPostAC = (obj) => {return { type: 'GET_POST', obj: obj }}
export let watcherGetPostAC = (obj) => {return { type: WATCHER_GET_POST, obj: obj }}
export let addPostAC = (obj) => {return { type: 'ADD_POST', obj: obj }}
export let postPostAC = (obj) => {return { type: 'POST_POST', obj: obj }}
export let postLikeAC = (obj) => {return { type: 'POST_LIKE', obj: obj }}
export let newLikeActionCreator = (obj) => { return {  type: 'NEW-LIKE',  obj: obj}}
export let authRequestAC = (obj) => {return { type: POST_AUTH,  obj: obj}}
export let dataUserAC = (obj) => {return { type: DATA_USER, obj: obj}}
export let dataAnotherUserAC = (obj) => {return { type: DATA_ANOTHER_USER, obj: obj}}
export let getDataUserAC = (obj) => { return { type: GET_DATA_USER, obj: obj}}
export let getAnotherDataUserAC = (obj) => { return { type: GET_ANOTHER_DATA_USER, obj: obj}}
export let addUserAC = (obj) => {return { type: POST_USER, obj: obj}}
export let deleteCommentAC = (obj) => {return {type: DELETE_COMMENT,  obj: obj}}
export let postData = (obj) => { return { type: POST_DATA, obj:  obj}} 
export let postCommentAC = (obj) => {return {type: POST_COMMENT, obj: obj }}
export let getDataComment = (obj) => {return { type: GET_DATA_COMMENT, obj:  obj}} 
export let uploadAvatarAC = (obj) => {return { type: UPLOAD_AVATAR, obj:  obj}} 
export let Watcher_miniatureAC = (obj) => {return { type: UPLOAD_MINIATURE, obj:  obj}} 
export let setAvatarAC = (obj) => {return { type: SET_AVATAR, obj:  obj}} 
export let setAvatarMiniAC = (obj) => {return { type: SET_AVATAR_MINI, obj:  obj}} 
export let watcherDeletePostAC = (obj) => {return { type: DELETE_POST_WATCHER, obj:  obj}} 
export let deletePostAC = (obj) => {return { type: DELETE_POST, obj:  obj}} 
export let watcherChangePostAC = (obj) => {return { type: WATCHER_CHANGE_POST, obj:  obj}} 
export let watcherDeletePhotoAC = () => {return { type: WATCHER_DELETE_PHOTO}} 
export let deletePhotoAC = (obj) => {return { type: DELETE_PHOTO, obj:  obj}} 

export default profileReducer;




