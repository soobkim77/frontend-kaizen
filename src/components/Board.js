import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core'
import Task from './Task'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import statuses from '../status'

const useStyles = makeStyles((theme) => ({
    taskCont: {
        margin: "auto"
    },
    col_wrapper: {
        padding: 20,
        border: 2,
        borderColor: "white",
        maxWidth: 400,
        minWidth: 350
    },
    col_header: {
        fontSize: "20px",
        fontWeight: 600,
        marginBottom: "20px",
        marginTop: 0
    }
})
)

const Board = (props) => {
    const history = useHistory();
    const classes = useStyles();


    return (
        
        <Fragment>
            {props.currentBoard.board ? 
            <Fragment>
            <Grid container xs={12} justify="center" >
            {statuses.map(s => {
                    return (
                        <Grid item alignItems="center" key={s} className={classes.col_wrapper} border={1} borderColor="white" xs={3}>
                            <h2 className={classes.col_header}>
                                {s.toUpperCase()}
                            </h2>
                                    {
                                        props.currentBoard.tasks
                                            .filter(t => t.status === s)
                                            .map((t, idx) => <Task key={t.id} index={idx} status={s} task={t} />)
                                    }
                        </Grid>
                    )
                })}
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