import profileReducer from "./profile-reducer"

let store = {
    _state : {
        profilePage : {
            postData: [
                {
                    id: 1, 
                    timePost: '20.10.2020',
                    name: 'Ilya Myshko', 
                    info:'Lorem ipsum dolor sit amet',
                    comment: 2,
                    likeList: [{idProfile: 0, time: ""},{idProfile: 2, time: ""}],
                    share: 5
                },
                {
                    id: 2, 
                    timePost: '20.10.2020',
                    name: 'Ilya Myshko', 
                    info:'Lorem ipsum dolor sit amet',
                    comment: 2,
                    likeList: [{idProfile: 0, time: ""}],
                    share: 5
                },
                {
                    id: 3, 
                    timePost: '20.10.2020',
                    name: 'Ilya Myshko', 
                    info:'Lorem ipsum dolor sit amet',
                    comment: 2,
                    likeList: [{idProfile: 0, time: ""}],
                    share: 5
                }
            ],
            newPostText : '',
        },
        dialogPage : {

        }
    },
    getState(){
        return this._state
    },
    _callSubscriber(){ },
    subscribe(observer){
        this._callSubscriber = observer
    },
    dispatch(action){
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._callSubscriber() 
    }
}

export default store

window.state = store
