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
        case ('START_ADDING_BOARD'): 
            return {...state, requesting: true}
        case ('START_COMPLETING_TASK'):
            return {...state, requesting: true}
        case ('START_EDITING_TASK'):
            return {...state, requesting: true}
        case ("GET_BOARDS"):
            return {...state, boards: action.boards, requesting: false }
        case ("SHOW_BOARD"):
            return { currentBoard: action.board, boards: { ...state.boards.boards }, requesting: false }
        case ("EDIT_BOARD"): 
            return {
                ...state, 
                boards: {...state.boards, boards: 
                [...state.boards.boards].map(board => board.id === action.board.id ? action.board : board)
            },
                requesting: false
                }
        case ("ADD_BOARD"): 
            return {
                ...state, 
                boards: {...state.boards, boards: 
                [...state.boards.boards, action.board]},
                requesting: false
                }
        case ('COMPLETING_TASK'): 
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard, tasks: 
                    [...state.currentBoard.tasks].map(task => task.id === action.task.id ? action.task : task)
                },
                requesting: false
            }
        case ('ADD_TASK'): 
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard, tasks: 
                    [...state.currentBoard.tasks, action.task]
                },
                requesting: false
            }
        case ("DELETE_BOARD"):
            return {
                ...state, 
                boards: {...state.boards, boards: 
                    [...state.boards.boards].filter(board => board.id !== action.board.id)
                },
                requesting: false
            }
        case ('DELETE_TASK'): 
            return {
                ...state,
                currentBoard: {
                    ...state.currentBoard, tasks: 
                    [...state.currentBoard.tasks].filter(task => task.id !== action.task.id )
                },
                requesting: false
            }
        case ('DROP_TASK'): 
            return {
                ...state, 
                currentBoard: {
                    ...state.currentBoard, tasks: 
                    [...state.currentBoard.tasks].filter(task => task !== action.task.id).concat({...action.task})
                }
            }
        case ('MOVE_TASK'):
            return {
                ...state, 
                currentBoard: {
                    ...state.currentBoard, tasks: 
                    [...state.currentBoard.tasks].filter((task, idx) => idx !== action.dragIndex).splice(action.hoverIndex, 0 , action.task)
                }
            }
        default:
            return state
    }
}

export default boards