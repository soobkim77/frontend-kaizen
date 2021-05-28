import React, { useState } from 'react'
import DragTask from './DragTask'
import TaskCol from './TaskCol'
import ColCont from './ColCont'
import statuses from '../status'
import {connect} from 'react-redux'
import { editTask } from '../redux/actions/editTask'
import { Grid } from '@material-ui/core'
import { dropTask } from '../redux/actions/dropTask'

const DropBoard = (props) => {
    
    const onDrop = (task, monitor, status) => {
            const mapping = statuses.find(si => si === status)
            task.status = status
            props.dropTask(task)
    }

    const moveTask = (dragIndex, hoverIndex) => {
        const task = props.currentBoard.tasks[dragIndex];
        
        // props.move(task, hoverIndex, dragIndex)
    }

    return (
        <>
           {props.currentBoard.tasks ? <Grid container spacing={3} >
                {statuses.map(s => {
                    return (
                        <div key={s}>
                            <h2>
                                {s.toUpperCase()}
                            </h2>
                            <ColCont onDrop={onDrop} status={s}>
                                <TaskCol>
                                    {
                                        props.currentBoard.tasks
                                            .filter(t => t.status === s)
                                            .map((t, idx) => <DragTask key={t.id} index={idx} moveTask={moveTask} status={s} task={t} />)
                                    }
                                </TaskCol>
                            </ColCont>
                        </div>
                    )
                })}
            </Grid> : <h1>Loading</h1>}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        currentBoard: {...state.boards.currentBoard}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editTask: (task) => {
            dispatch(editTask(task))
        },
        dropTask: (task) => {
            dispatch(dropTask(task))
        },
        move: () => {
            dispatch({ type: "MOVE_TASK"})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropBoard)
