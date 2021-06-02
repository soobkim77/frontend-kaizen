const initialState =  {
    teams: [],
    currentTeam: {},
    requesting: false,
    users: []
}

const teams = (state = initialState, action) => {
    switch(action.type) {
        case ('START_FETCH'):
            return {...state, requesting: true}
        case ('GET_TEAMS'):
            return {...state, teams: action.teams, requesting: false, currentTeam: state.currentTeam}
        case ("SHOW_TEAM"):
            return {...state, currentTeam: action.team, requesting: false}
        case ("GET_USERS"):
            return {...state, users: action.users, requesting: false }
        case ("CHANGE_TEAMS"):
            return {...state, currentTeam: action.team}
        case ("ADD_MEMBER"):
            return {...state, currentTeam: action.team, requesting: false}
        case ("ADD_TEAM"): 
            return {
                ...state, 
                teams: [...state.teams, action.team],
                requesting: false
                }
        case ("DELETE_MEMBER"): 
                return {
                    ...state,
                    currentTeam: action.team
                }
        default: 
            return state
    }
}

export default teams