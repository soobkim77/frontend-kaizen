import { useState } from 'react'
import TextField from "@material-ui/core/TextField";
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { editTask } from '../redux/actions/editTask'

const EditTaskForm = (props) => {
    const [title, setTitle] = useState(props.location.state.title);
    const [description, setDescription] = useState(props.location.state.description)
    const [dueDate, setDueDate] = useState(props.location.state.due_date);
    let history = useHistory();

    const handleChange = (event, type) => {
        let stateMap = {
            title: (event) => setTitle(event.target.value),
            description: (event) => setDescription(event.target.value),
            dueDate: (event) => setDueDate(event.target.value)
        };

        stateMap[type](event);
    }
    const submitEdit = (e) => {
        e.preventDefault();

        let task = {
            title: title,
            description: description,
            due_date: dueDate,
            id: props.location.state.id
        }

        props.editTask(task)
        history.push(`/boards/${props.location.state.board_id}`)
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
            <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                onChange={(event) => handleChange(event, "dueDate")}
                id='dueDate'
                label='Due Date'
                name='dueDate'
                autoFocus
                value={dueDate}
                // inputProps={{pattern: "^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$"}}
            />
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

const mapDispatchToProps = (dispatch) => {
    return {
        editTask: (task) => {
            dispatch(editTask(task))
        }
    }
}

export default connect(null, mapDispatchToProps)(EditTaskForm)