import React, { Component } from 'react'
import {Link} from 'react-router-dom';


export default class ActivitiesContainer extends Component {
    
    render() {
        // console.log({props: this.props})
        return (
            <div>
                <h1>Activities Donkey</h1>
                <Link to="/activities/breathe">Breathe</Link>
            </div>
        )
    }
}
