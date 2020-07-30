import React from 'react';
import { Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import ActivitiesContainer from './containers/ActivitiesContainer';
import Welcome from './pages/Welcome';
import Auth from './pages/Auth';
import Home from './pages/Home';



const API = 'http://localhost:3002/api/v1/activities'


class App extends React.Component {
  state = {
    activities: [],
    loggedIn: false,
    currentUserId: {}
  }

  componentDidMount() {
    fetch(API).then(resp => resp.json()).then(activities => this.setState({activities}))
  }
  
  

  handleLogin = user => {
    this.setState(prevState => {
      return {
        loggedIn: !prevState.loggedIn,
        currentUser: user
      }
    })
  }

  render() {
    return (
    <div className="App">
      <Switch>
        <Route path='/activities/:id' render={() => <div>An Activity</div>} />  
        <Route path='/welcome' render={(routerProps) =>  <Welcome loggedIn={this.state.loggedIn} {...routerProps}/>} />
        <Route path='/login' render={(routerProps) => <Auth loggedIn={this.state.loggedIn} handleLogin={this.handleLogin} {...routerProps}/>} />
        <Route exact path='/:username' render={(routerProps) => <Home currentUser={this.state.currentUser} loggedIn={this.state.loggedIn} activities={this.state.activities} {...routerProps}/>  } />
        <Route exact path='/' render={(routerProps) => <Home loggedIn={this.state.loggedIn} currentUser={this.state.currentUser} activities={this.state.activities} {...routerProps}/>  } />
      </Switch>

    </div>
    );
  }
  
}

export default App;
