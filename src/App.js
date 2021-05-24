import SignIn from './components/SignIn'
import NavBar from './components/NavBar'
import EditTaskForm from './components/EditTaskForm'
import EditBoardForm from './components/EditBoardForm'
import Board from './components/Board'
import { connect } from 'react-redux'
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from './pages/Home'
import './App.css';

const App = ({loggedIn}) =>  {
  return (
    <div className="App">
      {loggedIn.loggedIn ? <NavBar/> : <Redirect to='/' /> }
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/home" render={(routerProps) => <Home {...routerProps} />} />
        <Route exact path='/boards/:id' component={Board} />
        <Route exact path='/boards/edit/:id' component={EditBoardForm} />
        <Route exact path='/tasks/edit/:id' component={EditTaskForm} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(App);
