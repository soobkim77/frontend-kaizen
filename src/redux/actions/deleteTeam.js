export function deleteTeam(team) {
    return (dispatch) => {
        dispatch({ type: 'START_FETCH' });

        let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
        };
        fetch(`http://localhost:3000/teams/${team.id}`, configObj)
            .then(response => response.json())
            .then(team => {
                console.log(team)
                dispatch({ type: 'DELETE_TEAM', team })});
    };
}