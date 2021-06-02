export function addTeam(team) {
    return (dispatch) => {
        dispatch({ type: 'START_FETCH' });

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify(team)
        };
        fetch('http://localhost:3000/teams', configObj)
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'ADD_TEAM', team: data.team.data })});
    };
}