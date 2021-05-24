import { useState } from 'react'
import TextField from "@material-ui/core/TextField";
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { editBoard } from '../redux/actions/editBoard'

const EditBoardForm = (props) => {
    const [title, setTitle] = useState(props.location.state.title);
    const [description, setDescription] = useState(props.location.state.description)

    let history = useHistory();

    const handleChange = (event, type) => {
        let stateMap = {
            title: (event) => setTitle(event.target.value),
            description: (event) => setDescription(event.target.value),
        };

        stateMap[type](event);
    }
    const submitEdit = (e) => {
        e.preventDefault();

        let board = {
            title: title,
            description: description,
            id: props.location.state.id
        }

        props.editBoard(board)
        history.push(`/home`)
    }


    return (
        <form onSubmit={(e) => submitEdit(e)}>
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
                value={title}
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
                value={description}
            />
            <Button
                variant="contained"
                color="default"
                // className={classes.button}
                startIcon={<EditIcon />}
                type="submit"
                >
                Save Board
            </Button>
        </form>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        editBoard: (board) => {
            dispatch(editBoard(board))
        }
    }
}

export default connect(null, mapDispatchToProps)(EditBoardForm)