import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux'
import NewTeamDialog from './NewTeamDialog'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { Avatar, Button } from '@material-ui/core'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ChangeTeamDialog from './ChangeTeamDialog'
import StarIcon from '@material-ui/icons/Star';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { delMember } from '../redux/actions/delMember'



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
  del: {
    justifyContent: "right",
    alignItems: "right"
  }
}));

const PersistentDrawer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleTarget = (e) => {
      e.stopPropagation()
      console.log(e.target)
    switch(e.target.id){
      case("teams"):
        handleDrawerClose()
        return history.push('/teams')
      case("new-board"):
        handleDrawerClose()
        return history.push('/boards/create')
      case("new-team"): 
        handleDrawerClose()
        return history.push('/teams/create')
    }
   
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const homeLink = () => {
    history.push('/home')
    handleDrawerClose()
  }

  const signoutHelper = () => {
    localStorage.removeItem("jwt")
    props.signOut();
  }

  const delMember = (e) => {
    let user = props.users.filter(user => user.attributes.username == e.target.id)
    // let delObj = {
    //   member_id: user[0].id,
    //   team_id: props.currentTeam.id
    // }
    console.log(user)
    // props.delMember(delObj)
  }



  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => homeLink()} >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Kaizen
          </Typography>

          <Button color="inherit" onClick={() => signoutHelper()} >LogOut</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button onClick={(e) => handleTarget(e)}>
                <ListItemIcon id={"teams"} >
                    <PeopleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={"Teams"} />
            </ListItem>
            <ListItem button onClick={(e) => handleTarget(e)}>
                <ListItemIcon id={"new-board"} >
                    <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary={"Add a Board"} />
            </ListItem>

            <ListItem button onClick={(e) => handleTarget(e)}>
                <ListItemIcon id={"new-team"}>
                    <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary={"Add a Team"} />
            </ListItem>
        </List>
        <Divider />

        <List>
            {props.currentTeam.attributes ? 
            <>
            <h4>{props.currentTeam.attributes.name}</h4>
            <ListItem button key={props.currentTeam.id}>
                <ListItemIcon>
                    <StarIcon />
                </ListItemIcon>
                <ListItemText primary={props.currentTeam.attributes.leader.name} />
            </ListItem>
            {props.currentTeam.attributes.members.map((member) => (
            <ListItem button key={member}>
                <ListItemIcon>
                    <Avatar aria-label="member" className={classes.avatar}>
                        {member[0]}
                    </Avatar>
                </ListItemIcon>
                <ListItemText primary={member} />
                <ListItemIcon  className={classes.del}  >
                    <DeleteForeverIcon id={member} onClick={(e) => delMember(e)}/>
                </ListItemIcon>
            </ListItem>
            ))}
            <Divider />
            <ListItem button>
                <NewTeamDialog />
            </ListItem>
            <ListItem button>
                <ChangeTeamDialog />
            </ListItem>
            </>
             : null}
        </List>
      </Drawer>
    </div>
  );
}


const mapStateToProps = (state) => {
    return {
        currentTeam: state.teams.currentTeam,
        teams: state.teams.teams,
        users: state.teams.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      signOut: () => {
        dispatch({ type: "SignOut" })
      },
      delMember: (member) => {
        dispatch(delMember(member))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PersistentDrawer)