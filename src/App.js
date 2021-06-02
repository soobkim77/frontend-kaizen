import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import CreateTeam from './components/CreateTeam'
import EditTaskForm from './components/EditTaskForm'
import EditBoardForm from './components/EditBoardForm'
import Board from './components/Board'
import Teams from './pages/Teams'
import BoardForm from './components/BoardForm'
import Team from './components/Team'
import CreateTask from './components/CreateTask'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import PersistentDrawer from './components/PersistentDrawer'
import Home from './pages/Home'
import './App.css';

const App = ({loggedIn, logIn}) =>  {
  const history = useHistory()

  // useEffect(() => {
  //   const authToken = localStorage.getItem("jwt")
  //   if (authToken){
  //       logIn();
  //       history.push('/home')
  //   }
  //   else {
  //       history.push('/')
  //   }
    
  // }, [])

  return (
    <div className="App">
      {loggedIn.loggedIn ? <PersistentDrawer/> : null }
      <div style={{marginTop: 80}}>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/home" render={(routerProps) => <Home {...routerProps} />} />
          <Route exact path='/boards/create' component={BoardForm} />
          <Route exact path='/boards/:id' component={Board} />
          <Route exact path='/boards/:id/edit' component={EditBoardForm} />
          <Route exact path='/tasks/create' component={CreateTask} />
          <Route exact path='/tasks/:id/edit' component={EditTaskForm} />
          <Route exact path='/teams' component={Teams} />
          <Route exact path='/teams/create' component={CreateTeam} />
          <Route exact path='/teams/:id' component={Team} />
        </Switch>
      </div>
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
    logIn: () => {
      dispatch({ type: "RELOAD" })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
