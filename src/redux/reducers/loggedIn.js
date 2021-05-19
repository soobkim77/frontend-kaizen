const loggedIn = (state = {loggedIn: false}, action) => {
    switch(action.type){
        case("logIn"):
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