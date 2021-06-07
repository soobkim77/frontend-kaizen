
import clsx from 'clsx';
import { useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { connect } from 'react-redux'
import { Avatar } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import Modal from '@material-ui/core/Modal';
import NewTeamDialog from './NewTeamDialog'



const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  avatar: {
    backgroundColor: "red",
  },
}));

const BoardDrawer = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false
  }) 
  // const [open, setOpen] = useState(false)


  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {props.currentTeam.attributes.members.map((member) => (
          <ListItem button key={member}>
            <ListItemIcon>
              <Avatar aria-label="member" className={classes.avatar}>
                {member[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={member} />
          </ListItem>
        ))}
        <ListItem button>
          <NewTeamDialog />
        </ListItem>
      </List>
          <Divider />
          {/* <ListItem button onClick={handleOpen} >
            <ListItemIcon><AddBoxIcon /></ListItemIcon>
            <ListItemText primary={"Add a Member"} />
          </ListItem> */}
    </div>
  );

  return (
    <div>
        {['left'].map((anchor) => (
        <Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            Members: 
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        currentTeam: state.teams.currentTeam
    }
}

export default connect(mapStateToProps)(BoardDrawer)