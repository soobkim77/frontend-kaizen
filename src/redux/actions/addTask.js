export function addTask(task) {
    return (dispatch) => {
        dispatch({ type: 'START_ADDING_BOARD' });

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify(task)
        };
        fetch('http://localhost:3000/tasks', configObj)
            .then(response => response.json())
            .then(task => {
                dispatch({ type: 'ADD_TASK', task })});
    };
}