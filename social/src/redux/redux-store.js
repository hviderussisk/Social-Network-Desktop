import { combineReducers, createStore, applyMiddleware } from 'redux'
import newsReducer from './news-reducer'
import profileReducer from './profile-reducer'
import usersReducer from './users-reducer'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { watchPostLoad } from './sagas'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth-reducer'



let reducers = combineReducers({
    profilePage: profileReducer,
    userPage: usersReducer,
    newsPage: newsReducer,
    auth: authReducer,
    form : formReducer
})
let sagaMiddleware = createSagaMiddleware()
let store = createStore(reducers,applyMiddleware(sagaMiddleware , logger))
sagaMiddleware.run(watchPostLoad)

window.state = store.getState()
export default store