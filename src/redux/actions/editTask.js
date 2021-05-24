export function editTask(task) {
    return (dispatch) => {
        dispatch({ type: 'START_EDITING_TASK' });

        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify(task)
        };
        fetch(`http://localhost:3000/tasks/${task.id}`, configObj)
            .then(response => response.json())
            .then(task => {
                console.log(task)
                dispatch({ type: 'COMPLETING_TASK', task })});
    };
}