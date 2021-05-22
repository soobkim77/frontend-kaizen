import { useParams } from 'react-router-dom'
import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const URL = "http://localhost:3000/boards"

const Board = (props) => {
    // const { id } = useParams();

    // useEffect(() => {
    //     let configObj = {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    //         },
    //     };

    //     fetch(URL + "/" + id, configObj)
    //         .then((r) => r.json())
    //         .then((data) => console.log(data))
    //         .catch((e) => console.error("e:", e));
    // }, []);
    
    return (
        
        <Fragment>
            {props.currentBoard.board ? 
            <Fragment>
            {props.currentBoard.board.title}
            <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                    <Paper>
                    {props.currentBoard.tasks.filter(task => task.completed == false).map(task => {
                            return (
                                <div>
                                    {task.title}
                                </div>
                            )
                        }) }
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper>
                        {props.currentBoard.tasks.filter(task => task.completed == true).map(task => {
                            return (
                                <div>
                                    {task.title}
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