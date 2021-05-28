import { useState } from 'react'
import TextField from "@material-ui/core/TextField";
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { addTask } from '../redux/actions/addTask'

const CreateTask = (props) => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState()
    const [dueDate, setDueDate] = useState();
    const [status, setStatus] = useState();
    let history = useHistory();

    const handleChange = (event, type) => {
        let stateMap = {
            title: (event) => setTitle(event.target.value),
            description: (event) => setDescription(event.target.value),
            dueDate: (event) => setDueDate(event.target.value)
            // status: (event) => setStatus(event.target.value)
        };

        stateMap[type](event);
    }
    const submitAdd = (e) => {
        e.preventDefault();

        let boardID = props.currentBoard.board.id

        let task = {
            title: title,
            description: description,
            due_date: dueDate,
            board_id: props.currentBoard.board.id,
            status: status
        }
        props.addTask(task)
        history.push(`/boards/${boardID}`)
    }


    return (
        <form onSubmit={(e) => submitAdd(e)}>
                 
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
            <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                onChange={(event) => handleChange(event, "dueDate")}
                id='dueDate'
                label='Due Date - YYYY-MM-DD'
                name='dueDate'
                autoFocus
                value={dueDate}
                // inputProps={{pattern: "^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$"}}
            />
            {/* <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                onChange={(event) => handleChange(event, "status")}
                id='status'
                label='status'
                name='status'
                autoFocus
                value={status}
            /> */}
            <Button
                variant="contained"
                color="default"
                // className={classes.button}
                startIcon={<EditIcon />}
                type="submit"
                >
                Save Task
            </Button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        currentBoard: state.boards.currentBoard
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (task) => {
            dispatch(addTask(task))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)