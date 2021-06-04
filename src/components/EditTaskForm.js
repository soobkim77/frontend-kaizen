import { useState } from 'react'
import TextField from "@material-ui/core/TextField";
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { editTask } from '../redux/actions/editTask'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
      marginTop: 20
    },
    button: {
        marginTop: 50
    }
  }));

const EditTaskForm = (props) => {
    const [title, setTitle] = useState(props.location.state.title);
    const [description, setDescription] = useState(props.location.state.description)
    const [dueDate, setDueDate] = useState(props.location.state.due_date);
    const classes = useStyles()
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
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue="2021-06-04"
                    className={classes.textField}
                    onChange={(event) => handleChange(event, "dueDate")}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    value={dueDate}
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