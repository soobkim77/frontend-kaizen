import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import BoardPrev from '../components/BoardPrev'
import { fetchBoards } from '../redux/actions/fetchBoards'
import { addBoard } from '../redux/actions/addBoard'
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Button, makeStyles, Grid} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    gird: {
        justifyContent: "space-evenly",
        padding: "20px"
    }
  }));
  

const Home = (props) => {
    const classes = useStyles();
    const [newBoard, setNewBoard] = useState(false)
    const [title, setTitle] = useState();
    const [description, setDescription] = useState()

    

    const handleChange = (event, type) => {
        let stateMap = {
            title: (event) => setTitle(event.target.value),
            description: (event) => setDescription(event.target.value)
        };

        stateMap[type](event);
    }

    useEffect(() => {
        props.fetchBoards();
    }, [])

    const addBoard = (e) => {
        setTitle("");
        setDescription("");
        e.preventDefault();
        const board = {
            title: title,
            description: description
        }
        props.addBoard(board)
        setNewBoard(false)
    }

    const newBoardForm = () => {
        setNewBoard(!newBoard)
    }

    return (
        <div>
            <button onClick={() => newBoardForm()} >Add a Board</button>
            {newBoard ?
                <form onSubmit={(e) => addBoard(e)}>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        onChange={(event) => handleChange(event, "title")}
                        id='title'
                        label='title'
                        name='title'
                        autoFocus
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        onChange={(event) => handleChange(event, "description")}
                        id='description'
                        label='description'
                        name='description'
                        autoFocus
                    />
                        <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<CloudUploadIcon />}
                        type="submit"
                        >
                        Create Board
                        </Button>
                </form>
                :
                null
            }
            <Grid container direction='space-between'>
                {props.boards.boards ?
                    props.boards.boards.map(board => <BoardPrev board={board} key={board.id} />)
                    :
                    null}
            </Grid>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        boards: state.boards.boards,
        currentBoard: { ...state.currentBoard },
        requesting: state.requesting
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBoards: () => {
            dispatch(fetchBoards())
        },
        addBoard: (board) => {
            dispatch(addBoard(board))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)