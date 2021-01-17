export let FOLLOWING = 'FOLLOWING'
export let REQUEST_FRIEND = 'REQUEST_FRIEND'
export let FRIEND = 'FRIEND'
export let DELETE_FRIEND_WATCHER = 'DELETE_FRIEND_WATCHER'
export let AGREE_WATCHER = 'AGREE_WATCHER'
export let REJECT_WATCHER = 'REJECT_WATCHER'

let UNFOLLOW = 'UNFOLLOW'
let DELETE_FRIEND = 'DELETE_FRIEND'
let FOLLOW = 'FOLLOW'
let AGREE = 'AGREE'
let REJECT = 'REJECT'
let SETUSERS = 'SETUSERS'
let SETNEWUSERS = 'SETNEWUSERS'
let CURRENT_PAGE = 'CURRENT_PAGE'
let ISPROGRESS = 'ISPROGRESS'
let REQUEST_FRIEND_DATA = 'REQUEST_FRIEND_DATA'
let FRIEND_DATA = 'FRIEND_DATA'


let initialState = {
    usersData: [],
    requestFriendUsers: [],
    friend: [],
    pageNumber: 1,
    isProgress: false
}

let usersReducer = ( state = initialState, action ) => {
    switch(action.type){
        case FOLLOW:
            return {
                ...state, 
                usersData: state.usersData.map( u => {
                    if(action.obj.idWhom == u.id){ 
                        return {...u, followed: true}
                    }
                    return u
                } )
            }
        case REJECT:
            return {
                ...state, 
                requestFriendUsers: state.requestFriendUsers.filter( u =>  u.id !== action.data.id  )
            }
        case DELETE_FRIEND:
            return {
                ...state, 
                friend: state.friend.filter( u =>  u.id !== action.data.id  )
            }
        case AGREE:
            return {
                ...state, 
                requestFriendUsers: state.requestFriendUsers.filter( u =>  u.id !== action.data.id  )
            }
        case UNFOLLOW:
            return {
                ...state, 
                usersData: state.usersData.map( u => {
                    if(action.id === u.id){ 
                        return {...u, followed: false}
                    }
                    return u
                } )
            }
        case SETUSERS:
            return {
                ...state,
                usersData: action.data
            }
        case REQUEST_FRIEND_DATA:
            return {
                ...state,
                requestFriendUsers: action.data
            }
        case FRIEND_DATA:
            return {
                ...state,
                friend: action.data
            }
        case CURRENT_PAGE:
            let pageNumber = ++state.pageNumber
            return {
                ...state, 
                pageNumber: pageNumber
            }
        case SETNEWUSERS:
            let newUsers = action.data
            newUsers.map(newuser => state.usersData.push(newuser))
            return { 
                ...state, usersData: [...state.usersData]
             } 
        case ISPROGRESS:
            return {
                ...state, isProgress: action.isProgress
            }
        default:
            return state 
    } 
}

export let followAC = obj => {
    return { type: 'FOLLOW', obj: obj }
} 

export let watcherFOLLOWINGAC = data => {
    return { type: FOLLOWING, obj : data }
} 

export let unfollowAC = UserId => {
    return { type: 'UNFOLLOW', id: UserId }
}

export let setUsersAC = data => {
    return { type: 'SETUSERS', data: data}
}

export let getRequestFriendWatcherAC = data => {
    return { type: REQUEST_FRIEND, data: data}
}
export let getRequestFriendAC = data => {
    return { type: REQUEST_FRIEND_DATA, data: data}
}
export let getFriendWatcherAC = data => {
    return { type: FRIEND, data: data}
}
export let getFriendAC = data => {
    return { type: FRIEND_DATA, data: data}
}
export let agreeWatcherAC = data => {
    return { type: AGREE_WATCHER, data: data}
}
export let agreeAC = data => {
    return { type: AGREE, data: data}
}
export let deleteAC = data => {
    return { type: DELETE_FRIEND, data: data}
}
export let deleteWathcerAC = data => {
    return { type: DELETE_FRIEND_WATCHER, data: data}
}
export let rejectWatcherAC = data => {
    return { type: REJECT_WATCHER, data: data}
}
export let rejectAC = data => {
    return { type: REJECT, data: data}
}

export let currentPageAC = () => {
    return { type: 'CURRENT_PAGE' }
}

export let setNewUsersAC = data => {
    return { type: 'SETNEWUSERS', data: data}
}

export let setIsProgressAC = boolean => {
    return { type: 'ISPROGRESS', isProgress: boolean}
}


export default usersReducer;