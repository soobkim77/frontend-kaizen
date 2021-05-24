export function editBoard(board) {
    return (dispatch) => {
        dispatch({ type: 'START_EDITING_BOARD' });

        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify(board)
        };
        fetch(`http://localhost:3000/boards/${board.id}`, configObj)
            .then(response => response.json())
            .then(board => {
                console.log(board)
                dispatch({ type: 'EDIT-BOARD', board })});
    };
}