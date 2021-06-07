import { combineReducers } from 'redux'
import loggedIn from './loggedIn'
import boards from './boards'
import teams from './teams'

export default combineReducers({
    loggedIn,
    boards,
    teams
})