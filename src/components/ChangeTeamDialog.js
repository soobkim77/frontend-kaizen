import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux'
import { useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';

const ChangeTeamDialog = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState();

  const handleClickOpen = (e) => {
    e.stopPropagation()
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation()
    setOpen(false);
  };

  const submitChange = (e) => {
    e.preventDefault()
    let newTeam = props.teams.filter(team => team.attributes.name === inputValue)
    props.changeTeam(newTeam[0])
    setOpen(false);
  }


  return (
    <div>
      <Button variant="outlined" color="white" style={{width: 200}} onClick={(e) => handleClickOpen(e)}>
        Change Team
      </Button>
      <Dialog open={open} onClose={(e) => handleClose(e)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change Current Team</DialogTitle>
            <DialogContent>
            <Autocomplete
                id="controllable-dialog"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                options={props.teams.map(team => team.attributes.name )}
                renderInput={(params) => (
                <TextField {...params} label="Your Teams" margin="normal" variant="outlined" />
                )}
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={(e) => submitChange(e)} id="submit"  color="primary">
                Add
            </Button>
            </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        teams: state.teams.teams
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTeam: (team) => {
        dispatch({type: "CHANGE_TEAMS", team})
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeTeamDialog)