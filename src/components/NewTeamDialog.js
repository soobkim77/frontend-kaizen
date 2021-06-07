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
import { addMember } from '../redux/actions/addMember'
import { makeStyles } from '@material-ui/core'


const NewTeamDialog = (props) => {
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

  const handleUser = (e) => {
    let mem = props.users.filter(user => user.attributes.username === inputValue)
    let memberObj = {
      team_members: 
          { 
            member_id: mem[0].id,
            team_id: props.currentTeam.id
          }
    }
    props.addMember(memberObj)
    e.stopPropagation()
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" style={{width: 200}} color="white" onClick={(e) => handleClickOpen(e)}>
        Add Member
      </Button>
      <Dialog open={open} onClose={(e) => handleClose(e)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Search for a user to add to your team!
          </DialogContentText>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="user-search"
            options={props.users.map(user => user.attributes.username )}
            renderInput={(params) => (
              <TextField {...params} label="Users" margin="normal" variant="outlined" />
            )}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => handleUser(e)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        users: state.teams.users,
        currentTeam: state.teams.currentTeam
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMember: (member) => {
      dispatch(addMember(member))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewTeamDialog)