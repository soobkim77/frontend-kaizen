import SignIn from './components/SignIn'
import NavBar from './components/NavBar'
import { connect } from 'react-redux'
import './App.css';

const App = ({loggedIn}) =>  {
  return (
    <div className="App">
      {loggedIn.loggedIn ? <NavBar/> : <SignIn/>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(App);
