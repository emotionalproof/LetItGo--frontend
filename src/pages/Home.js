import React, { Component } from 'react'
import HomeNavbar from '../components/HomeNavbar';
import { Route, Switch} from 'react-router-dom';


export default class Home extends Component {
   


    render() {
        console.log(this.props)
        return (
            
            <div>
            <HomeNavbar />
            {/* {!this.props.loggedIn && this.props.history.push('/welcome')} */}
                

            </div>
        )
    }
}
