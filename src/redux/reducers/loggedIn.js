const initialState = {
    loggedIn: false,
    boards: [],
    user: {}
}

const loggedIn = (state = initialState, action) => {
    switch(action.type){
        case("logIn"):
            return {
                loggedIn: true,
                user: action.payload
            }
        case ("RELOAD"):
            return {
                loggedIn: true
            }
        case("SignOut"):
            return {
                loggedIn: false
            }
        default:
            return state
    }
}

export default loggedIn