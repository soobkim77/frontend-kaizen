import { useState } from 'react'
import TextField from "@material-ui/core/TextField";
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { addBoard } from '../redux/actions/addBoard'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { InputLabel, Select, MenuItem} from '@material-ui/core'


const BoardForm = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [owner, setOwner] = useState('User');
    const [team, setTeam] = useState("")

    let history = useHistory();

    const handleChange = (event, type) => {
        let stateMap = {
            title: (event) => setTitle(event.target.value),
            description: (event) => setDescription(event.target.value),
            owner: (event) => setOwner(event.target.value),
            team: (event) => setTeam(event.target.value)
        };

        stateMap[type](event);
    }

    const submitBoard = (e) => {
        e.preventDefault()
        let board = {
            title: title,
            description: description,
            owner_type: owner,
        }
        if(owner === "team"){
            board.team = team
            props.addBoard(board)
        }
        props.addBoard(board)
        history.push("/home")
    }



    return (
        <form onSubmit={(e) => submitBoard(e)}>
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
            <FormControl component="fieldset">
                <FormLabel component="legend">Owner</FormLabel>
                    <RadioGroup aria-label="owner" name="owner1" value={owner} onChange={(event) => handleChange(event, "owner")}>
                        <FormControlLabel value="User" control={<Radio />} label="User" />
                        <FormControlLabel value="Team" control={<Radio />} label="Team" />
                    </RadioGroup>
                    {owner === "User" ?
                     null 
                     : 
                     <>
                        <InputLabel id="team-select">Team:</InputLabel>
                        <Select
                        labelId="team-select"
                        id="team-select"
                        value={team}
                        onChange={(event) => handleChange(event, "team")}
                        >
                            {props.teams.map(t => {
                                return <MenuItem value={t.name}>{t.name}</MenuItem>
                            })}
                        </Select>
                    </>
                    }
            </FormControl>
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
        addBoard: (board) => {
            dispatch(addBoard(board))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        teams: state.teams.teams
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardForm)