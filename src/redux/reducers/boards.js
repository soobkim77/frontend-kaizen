const initialState = {
    boards: []
}

const boards = (state = initialState, action) => {
    switch(action.type){
        case("get-boards"):
            return {boards: action.payload}
        default: 
            return state
    }
}

export default boards