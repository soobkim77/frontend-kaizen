import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core'
import Task from './Task'
import { useHistory } from 'react-router-dom'



const Board = (props) => {
    const history = useHistory();

    const addTask = () => {
        history.push("/tasks/create")
    }

    return (
        
        <Fragment>
            <Button variant="outlined" onClick={() => addTask()}>
                Add A Task
            </Button>
            {props.currentBoard.board ? 
            <Fragment>
            {props.currentBoard.board.title}
            <Grid container spacing={6}>
                <Grid item xs={6} sm={6}>
                    <Paper>
                        <h3>To-Do:</h3>
                    {props.currentBoard.tasks.filter(task => task.completed === false).map(task => {
                            return (
                                <Task task={task} key={task.id} />
                            )
                        }) }
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <Paper>
                        <h3>Completed:</h3>
                        {props.currentBoard.tasks.filter(task => task.completed === true).map(task => {
                            return (
                                <div>
                                    <Task task={task} key={task.id} />
                                </div>
                            )
                        }) }
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>

                </Grid>
            </Grid>
            </Fragment> : <h1>Loading</h1>}
        </Fragment>

    )
}

const mapStateToProps = (state) => {
    return {
        currentBoard: state.boards.currentBoard
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         showBoard: (board) => {
//             dispatch({ type: "sho", payload: board })
//         }
//     }
// }
export default connect(mapStateToProps, null)(Board)