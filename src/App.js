import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Switch} from 'react-router-dom';
import './App.css';
import Welcome from './components/Welcome';


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
<<<<<<< HEAD
      <Welcome />
=======
      I'm the Best Fucking App Ever 
>>>>>>> ca179cf50addbab9b60e55ff2e017c1ef8178e70
    </div>
    );
  }
  
}

export default App;
