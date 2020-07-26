import React, { Component } from 'react'
import Navbar from '../components/Navbar';
import { Route, Switch} from 'react-router-dom';


export default class Home extends Component {
   


    render() {
        console.log(this.props)
        return (
            
            <div>
            <Navbar />
            {/* {!this.props.loggedIn && this.props.history.push('/welcome')} */}
                

            </div>
        )
    }
}
