import React from "react"


const TaskCol = ({ isOver, children }) => {
    const className = isOver ? "highlight-region": "";
    return (
        <div>
            {children}
        </div>
    )
}

export default TaskCol