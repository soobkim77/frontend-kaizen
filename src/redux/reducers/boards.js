const initialState = {
    boards: [],
    currentBoard: {},
    requesting: false
}

const boards = (state = initialState, action) => {
    switch (action.type) {
        case ('START_GETTING_BOARDS'): 
            return {...state, boards: state.boards, requesting: true}
        case ('START_GETTING_BOARD'): 
            return {...state, requesting: true}
        case ("GET_BOARDS"):
            return {...state, boards: action.boards, requesting: false }
        case ("SHOW_BOARD"):
            return { currentBoard: action.board, boards: { ...state.boards }, requesting: false }
        default:
            return state
    }
}

export default boards