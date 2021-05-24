export function deleteBoard(board) {
    return (dispatch) => {
        dispatch({ type: 'START_GETTING_BOARD' });

        let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
        };
        fetch(`http://localhost:3000/boards/${board.id}`, configObj)
            .then(response => response.json())
            .then(board => {
                console.log(board)
                dispatch({ type: 'DELETE_BOARD', board })});
    };
}