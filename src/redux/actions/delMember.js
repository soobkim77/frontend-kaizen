export function delMember(member) {
    return (dispatch) => {
        dispatch({ type: 'START_FETCH' });

        let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify(member)
        };
        
        fetch(`http://localhost:3000/team_members/deleter`, configObj)
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'DELETE_MEMBER', team: data.team.data })});
    };
}