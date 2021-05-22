export function fetchBoards() {
    return (dispatch) => {
        dispatch({ type: 'START_GETTING_BOARDS' });
        let configObj = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        };
        fetch('http://localhost:3000/boards', configObj)
            .then(response => response.json())
            .then(boards => dispatch({ type: 'GET_BOARDS', boards }));
    };
}