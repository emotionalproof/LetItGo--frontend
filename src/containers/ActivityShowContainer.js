import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/esm/Button'
import BreatheComponent from '../components/activities/BreatheComponent';
import Learn from '../components/activities/Learn';
import PlayPiano from '../components/activities/Plays';
import Remember from '../components/activities/Remember';
import Walk from '../components/activities/Walk';
import Select from '../components/activities/Select';
import Smile from '../components/activities/Smile';

const activities = [{name: "Breathe", id: 17}, {name: "Learn", id: 18}, {name: "Play", id: 19}, {name: "Walk", id: 20}, {name: "Remember", id: 21}, {name: "Select", id: 22} ]


class ActivityShowContainer extends Component {

    state = {
        activity: "button",
        logs: []
    }

    componentDidMount() {
        this.fetchUserActivityLogs()
    }

   
    renderRoutineActivities = () => {
        const routineLength = this.props.routine.length
        // routineLength < 1 || routineLength === undefined ? 
        const firstRoutine = (this.props.routine[0] === undefined ? 
            22 : this.props.routine.sort((a, b) => a.position - b.position)[0].activity_id)
        const activityName = activities.find(activity => activity.id === firstRoutine).name
        return activityName
    }

    renderRoutineActivities = () => {
        const routineLength = this.props.routine.length
        // routineLength < 1 || routineLength === undefined ? 
        const firstRoutine = (this.props.routine[0] === undefined ? 
            22 : this.props.routine.sort((a, b) => a.position - b.position)[0].activity_id)
        const activityName = activities.find(activity => activity.id === firstRoutine).name
        return activityName
    }

    getNextActivtiy = () => {
        
    }

    fetchUserActivityLogs = () => {
        fetch(`http://localhost:3002/api/v1/user_activity_logs/`)
        .then(resp => resp.json())
        .then(logs => {
            console.log(logs)
            this.setState({logs: logs})
        })
        
    }

    

    render() {
        // console.log("props", this.props)
        // console.log("state", this.state)
        const next = this.renderRoutineActivities()
        return (
            <Container fluid className="activity-load-container">
                    <Row className="activity-load-row">
                        <Col md={1} className="column-vertical-bar"></Col>
                        <Col md={10} className="activity-load-column">
                            {next === "Select" ? <Select /> : this.props.routineStart === false ? <Select /> : 
                            next === "Breathe" ? <BreatheComponent /> : 
                            next === "Walk" ? <Walk />: 
                            next === "Remember" ? <Remember logs={this.state.logs} userActivity={this.props.routine[0]} name="Remember" id={21}/> : 
                            next === "Learn" ? <Learn /> : 
                            <PlayPiano />}
                        </Col>
                        <Col md={1} className="column-vertical-bar"><Row></Row>
                            <div className="timer-seperator"></div>
                            <Row><Button className="routine-button" onClick={this.props.nextActivity}>Finish</Button></Row>
                        </Col>
                    </Row>
            </Container>
        )
    }
}

export default ActivityShowContainer