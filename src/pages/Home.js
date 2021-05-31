import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import BoardPrev from '../components/BoardPrev'
import { fetchBoards } from '../redux/actions/fetchBoards'
import { addBoard } from '../redux/actions/addBoard'
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Button, makeStyles, Grid} from "@material-ui/core";
import { getTeams } from '../redux/actions/getTeams'


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    grid: {
        justifyContent: "space-evenly",
        padding: "20px"
    }
  }));
  

const Home = (props) => {
    const classes = useStyles();
    
    useEffect(() => {
        props.fetchBoards();
        props.getTeams();
    }, [])


    return (
        <div>
            <Grid container direction='space-between'>
                {props.boards.boards ?
                    props.boards.boards.map(board => <BoardPrev board={board} key={board.id} />)
                    :
                    null}
            </Grid>
            {console.log(props)}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        boards: state.boards.boards,
        currentBoard: { ...state.currentBoard },
        requesting: state.requesting,
        teams: state.teams.teams
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBoards: () => {
            dispatch(fetchBoards())
        },
        addBoard: (board) => {
            dispatch(addBoard(board))
        },
        getTeams: () => {
            dispatch(getTeams())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)