export function showTeam(id) {
    return (dispatch) => {
        dispatch({ type: 'START_FETCH' });
        let configObj = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        };
        fetch(`http://localhost:3000/teams/${id}`, configObj)
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'SHOW_TEAM', team: data.team.data })});
    };
}