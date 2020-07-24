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
      I'm the Best Fucking App Ever 
      <Switch>
        <Route exactpath='/' render={() => <div>Home</div>} />
        <Route path='/navbar' render={() => <div>Navbar</div>} />
        <Route path='/activities' render={() => <div>Activities</div>} />
        <Route path='/activities/:id' render={() => <div>An Activity</div>} />  
      </Switch>
      
    </div>
    );
  }
  
}

export default App;
