export function getUsers() {
    return (dispatch) => {
        dispatch({ type: 'START_FETCH' });
        let configObj = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        };
        fetch('http://localhost:3000/users', configObj)
            .then(response => response.json())
            .then(data => dispatch({ type: 'GET_USERS', users: data.users.data }));
    };
}