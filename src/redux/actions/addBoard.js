export function addBoard(board) {
    return (dispatch) => {
        dispatch({ type: 'START_ADDING_BOARD' });

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify(board)
        };
        fetch('http://localhost:3000/boards', configObj)
            .then(response => response.json())
            .then(board => {
                if (board.board.owner_type === "User"){
                    dispatch({ type: 'ADD_BOARD', board })
                } 
                } 
               );
    };
}