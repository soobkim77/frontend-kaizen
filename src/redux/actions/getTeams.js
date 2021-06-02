export function getTeams() {
    return (dispatch) => {
        dispatch({ type: 'START_FETCH'});
        let configObj = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        };
        fetch('http://localhost:3000/teams', configObj)
        .then(response => response.json())
        .then(data => {
            let led = data.teams.data
            let mems = data.mem.data
            let teams = led.concat(mems)
            dispatch({ type: 'GET_TEAMS', teams})
        });
    }
}