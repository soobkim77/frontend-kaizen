import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import { Menu, MenuItem } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const  NavBar = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    switch(e.target.id){
      case("teams"):
        return history.push('/teams')
      case("new-board"):
        return history.push('/boards/create')
    }
  };

  const homeLink = () => {
    history.push('/home')
  }

  const signoutHelper = () => {
    localStorage.removeItem("jwt")
    props.signOut();
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" aria-haspopup="true" aria-controls="nav-menu" onClick={handleClick}>
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
      <Menu
        id="nav-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem id="teams" onClick={handleClose}>Teams</MenuItem>
        <MenuItem id="new-board" onClick={handleClose}>Create a Board</MenuItem>
        <MenuItem id="new-team" onClick={handleClose}>Create a Team</MenuItem>
      </Menu>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
      loggedIn: state.loggedIn
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      signOut: () => {
        dispatch({ type: "SignOut" })
      }
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)