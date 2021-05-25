export function deleteTask(task) {
    return (dispatch) => {
        dispatch({ type: 'START_GETTING_BOARD' });

        let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
        };
        fetch(`http://localhost:3000/tasks/${task.id}`, configObj)
            .then(response => response.json())
            .then(task => {
                console.log(task)
                dispatch({ type: 'DELETE_TASK', task })});
    };
}