import SignIn from './components/SignIn'
import NavBar from './components/NavBar'
import { connect } from 'react-redux'
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from './pages/Home'
import './App.css';

const App = ({loggedIn}) =>  {
  return (
    <div className="App">
      {loggedIn.loggedIn ? <NavBar/> : null}
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/home" render={(routerProps) => <Home {...routerProps} />} />
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
