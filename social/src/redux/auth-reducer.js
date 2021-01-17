let ERROR_AUTH = 'ERROR_AUTH'
export let REG_USER = 'REG_USER'

let initialState = {
    authError: {}
}

let authReducer = ( state = initialState, action ) => {
    switch(action.type){
        case ERROR_AUTH:
            return {
                ...state, 
                authError: action.obj.response.data
                } 
        default:
            return state 
    } 
}
export let followAC = obj => {return { type: 'ERROR_AUTH', obj: obj }} 
export let registrationAC = obj => {return { type: REG_USER, obj: obj }} 
//export let AddUserAC = obj => {return { type: STATUS_REG, obj: obj }} 




export default authReducer;