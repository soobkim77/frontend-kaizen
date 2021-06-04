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
import { InputLabel, Select, MenuItem, makeStyles, Grid} from '@material-ui/core'
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 800,
      alignItems: "center",
      justify: "center",
      margin: "auto",
      gridTemplateColumns: (5, "1fr"),
      gridTemplateRows: (5, "1fr"),
      gridColumnGap: "0px",
      gridRowGap: "0px"
    },
    r1: {
        gridArea: 1/1/2/6
    },
    r2: {
        gridArea: 2/1/3/6
    },
    r3: {
        gridArea: 3/3/4/4
    },
    r4: {
        gridArea:  5 / 3 / 6 / 4
    },
    r5: {
        gridArea:  4 / 1 / 5 / 3
    },
    r6: {
        gridArea:  4 / 4 / 5 / 6
    }
  }));


const BoardForm = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [owner, setOwner] = useState('User');
    const [team, setTeam] = useState("")
    const classes = useStyles();

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
        if(owner === "Team"){
            board.owner_id = team
            props.addBoard(board)
        } else {
            props.addBoard(board)
        }

        history.push("/home")
    }



    return (
        <Grid lg={5} className={classes.root}> 
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
                    className={classes.r1}
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
                    className={classes.r2}
                />
                <FormControl component="fieldset">
                    <FormLabel component="legend" className={classes.r3}>Owner</FormLabel>
                        <RadioGroup  aria-label="owner" name="owner1" value={owner} onChange={(event) => handleChange(event, "owner")}>
                            <FormControlLabel className={classes.r5} value="User" control={<Radio />} label="User" />
                            <FormControlLabel className={classes.r6} value="Team" control={<Radio />} label="Team" />
                        </RadioGroup>
                        {owner === "User" ?
                        null 
                        : 
                        <div >
                            {/* <InputLabel id="team-select">Team:</InputLabel> */}
                            <Select
                            labelId="team-select"
                            id="team-select"
                            value={team}
                            onChange={(event) => handleChange(event, "team")}
                            >
                                {props.teams.map(t => {
                                    return (
                                        <MenuItem key={t.id} value={t.attributes.id}>
                                            <Typography>
                                                {t.attributes.name}
                                            </Typography>
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </div>
                        }
                </FormControl>
                <Button
                    variant="contained"
                    color="default"
                    className={classes.r4}
                    startIcon={<EditIcon />}
                    type="submit"
                    >
                    Save Board
                </Button>
            </form>
        </Grid>
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