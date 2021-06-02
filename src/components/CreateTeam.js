import { useState } from 'react'
import TextField from "@material-ui/core/TextField";
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { addTeam } from '../redux/actions/addTeam'

const CreateTeam = (props) => {
    const [name, setName] = useState();
    const [description, setDescription] = useState()
    let history = useHistory();

    const handleChange = (event, type) => {
        let stateMap = {
            name: (event) => setName(event.target.value),
            description: (event) => setDescription(event.target.value),
        };

        stateMap[type](event);
    }
    const submitAdd = (e) => {
        e.preventDefault();

        let team = {
            name: name,
            description: description
        }
        props.addTeam(team)
        history.push(`/teams`)
    }


    return (
        <form onSubmit={(e) => submitAdd(e)}>
                 
             <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                onChange={(event) => handleChange(event, "name")}
                id='name'
                label='name'
                name='name'
                autoFocus
                value={name}
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
                Save Team
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
        addTeam: (team) => {
            dispatch(addTeam(team))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam)