import React from 'react'
import { useDrop } from "react-dnd"
import ItemTypes from '../dnd/type'
import statuses from '../status'
import { Grid } from '@material-ui/core'

const ColCont = ({onDrop, children, status}) => {
    const [{ isOver }, drop] = useDrop({
        accept: "task",
        canDrop: (task, monitor) => {
            const taskIndex = statuses.findIndex(si => si === task.status);
            const statusIndex = statuses.findIndex(si => si === status)
            return [taskIndex + 1, taskIndex -1, taskIndex].includes(statusIndex) 
        },
        drop: (task, monitor) => {
            onDrop(task, monitor, status);
        }, 
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    })

    return(
        <Grid item ref={drop}>
            {React.cloneElement(children, {onDrop})}
        </Grid>
    )
}

export default ColCont;