import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';



const API = 'http://localhost:3001/activities'


class App extends React.Component {
  state = {
    activities: []
  }

  componentDidMount(API) {
    fetch(API).then(resp => resp.json()).then(activities => this.setState({activities}))
  }

  render() {
    return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path='/activities/:id' render={() => <div>An Activity</div>} />  
        <Route path='/activities' render={() => <div>Activities</div>} />
        <Route path='/welcome' render={() => <div>Welcome</div>} />
        <Route exact path='/' render={() => <div>Home</div>} />
      </Switch>
      
    </div>
    );
  }
  
}

export default App;
