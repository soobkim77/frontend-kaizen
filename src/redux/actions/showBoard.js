export function showBoard(id) {
    return (dispatch) => {
        dispatch({ type: 'START_GETTING_BOARD' });
        let configObj = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        };
        fetch(`http://localhost:3000/boards/${id}`, configObj)
            .then(response => response.json())
            .then(board => {
                dispatch({ type: 'SHOW_BOARD', board })});
    };
}