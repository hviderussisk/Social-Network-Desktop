let POST = 'POST'
let MORE = 'MORE'

let initialState = {
    newsData: [],
    size: 10,
    page: 0
}

let newsReducer = ( state = initialState, action ) => {
    switch(action.type){
        case POST:
            return {
                ...state, 
                newsData: action.array
            }
        case MORE:
            return {
                ...state,
                page: action.current
            }
        default:
            return state 
    } 
}
export let postAC = array => {
    return { type: 'POST', array: array }
} 
export let moreNewsAC = (current) => {
    return { type: 'MORE', current: current}
} 


export default newsReducer;