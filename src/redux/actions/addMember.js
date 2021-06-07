export function addMember(member) {
    return (dispatch) => {
        dispatch({ type: 'START_FETCH' });

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify(member)
        };
        fetch('http://localhost:3000/team_members', configObj)
            .then(response => response.json())
            .then(team => {
                console.log(team)
                dispatch({ type: 'ADD_MEMBER', team: team.team.data})});
    };
}