import { combineReducers } from 'redux'
import loggedIn from './loggedIn'
import boards from './boards'

export default combineReducers({
    loggedIn,
    boards
})