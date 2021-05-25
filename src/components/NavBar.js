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

  const homeLink = () => {
    history.push('/home')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => homeLink()} >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Kaizen
          </Typography>
          <Button color="inherit" onClick={() => props.signOut()} >LogOut</Button>
        </Toolbar>
      </AppBar>
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