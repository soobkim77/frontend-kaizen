const initialState =  {
    teams: [],
    currentTeam: {},
    requesting: false
}

const teams = (state = initialState, action) => {
    switch(action.type) {
        case ('START_FETCH'):
            return {...state, requesting: true}
        case ('GET_TEAMS'):
            return {...state, teams: [action.teams], requesting: false, currentTeam: state.currentTeam}
        case ("SHOW_TEAM"):
            return {...state, currentTeam: action.team, requesting: false}
        default: 
            return state
    }
}

export default teams