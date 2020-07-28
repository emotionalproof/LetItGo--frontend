import React, { Component } from 'react'
import HomeNavbar from '../components/HomeNavbar';
import RoutineSelectContainer from '../containers/RoutineSelectContainer'
import RoutineContainer from '../containers/RoutineContainer';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/esm/Button'
import BreatheComponent from '../components/activities/BreatheComponent';
import Learn from '../components/activities/Learn';
import PlayPiano from '../components/activities/Plays';
import Remember from '../components/activities/Remember';

const activities = [{name: "Breathe", id: 17}, {name: "Learn", id: 18}, {name: "Play", id: 19}, {name: "Walk", id: 20}]

class Home extends Component {
    state = {
        routine: [],
        routineActivities: [17, 18, 19, 20],
        user: {},
        displayRoutine: true,
        activities: []
    }

    componentDidMount() {
        this.fetchUser()
        this.fetchActivities()

    }

    fetchUser = () => {
        const username = this.props.match.params.username
        fetch(`http://localhost:3002/api/v1/users/login/${username}`).then(resp => resp.json())
        .then(userData => this.setState({user: userData}))
        .then(() => this.fetchRoutine())
    }

    fetchRoutine = () => {
        fetch(`http://localhost:3002/api/v1/users/${this.state.user.id}/user_activities`)
        .then(resp => resp.json())
        .then(routineData => this.setState({routine: routineData}))
    }

    fetchActivities = () => {
        fetch('http://localhost:3002/api/v1/activities').then(resp => resp.json()).then(activities => this.setState({activities}))
    }


    addToRoutine = id => {
        fetch(`http://localhost:3002/api/v1/user_activities`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                position:   this.state.routine.length,
                user_id:    this.state.user.id,
                activity_id: id
            })
        })
        .then(resp => resp.json())
        .then(userActObj => {
            // this.fetchRoutine()
            this.setState(prevState => {
                return {
                    routine: [...prevState.routine, userActObj]
                }
                
            })

            // console.log(this.state)
        })
    }


    removeFromRoutine = userAct => {
        fetch(`http://localhost:3002/api/v1/user_activities/${userAct.id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
        .then(() => {
            this.setState(prevState => {
                let newRoutine = prevState.routine
                newRoutine.splice(userAct.position, 1)
                    return{
                        routine: newRoutine
                    }
            })
            
        })
        .then(() => this.updateRoutine())
        
    }

    
    updateRoutine = () => {
        // this.setState({routine: []})
        let routine = this.state.routine
        routine.forEach((routineItem, index) =>
        fetch(`http://localhost:3002/api/v1/user_activities/${routineItem.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                position: index
            })
        })
        .then(resp => resp.json())
        .then(json => {
            this.fetchRoutine()
        })
        )
    }

 

    completeActivity = id => {
        fetch(`http://localhost:3002/api/v1/user_activities/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                completed: true
            })
        })
        .then(resp => resp.json())
        .then(json => {
            this.fetchRoutine()
        })
    }

    renderRoutineActivities = () => {
        const activityId = this.state.routineActivities[0]
        const activity = activities.find(activity => activity.id === activityId)
        return activity.name
    }

    nextActivity = () => {
        const first = this.state.routineActivities[0]
        this.setState(prevState => {
            prevState.routineActivities.splice(0, 1)
            return{
                routineActivities: [...prevState.routineActivities, first]
            }
        })
  

    }

    render() {
        // console.log(this.state.routine)
        console.log("render",this.state)
        return (
            <>
                <HomeNavbar />
                {/* {!this.props.loggedIn && this.props.history.push('/welcome')} */}
                <div className="horizontal-bar"></div>
                <Container  fluid="md" className="home-top-container">
                    <Row>
                        <Col><RoutineSelectContainer activities={this.props.activities} addToRoutine={this.addToRoutine}/></Col>
                    </Row>
                </Container>
                <div className="horizontal-bar"></div>
                <Container fluid className="routine-container" >
                    <Row className="routine-row">
                        <Col md={1} className="column-vertical-bar"></Col>
                        <Col md={3} onClick={this.nextActivity}className="button-column"><button className="start-routine-button">Start Your Routine</button></Col>
                        <Col md={1} className="column-vertical-bar"></Col>
                        <Col md={3} className="routine-item-column"><RoutineContainer removeFromRoutine={this.removeFromRoutine} activities={this.props.activities} routine={this.state.routine}/></Col>
                    </Row>
                </Container>
                <div className="horizontal-bar"></div>             
                <Container fluid className="activity-load-container">
                    <Row className="activity-load-row">
                        <Col md={1} className="column-vertical-bar"></Col>
                        <Col md={10} className="activity-load-column">
                        {this.renderRoutineActivities() === "Breathe" ? <BreatheComponent /> : this.renderRoutineActivities() === "Play" ? <PlayPiano /> : <Remember />}
                        </Col>
                        <Col md={1} className="column-vertical-bar">
                            <Row><Button className="routine-button" onClick={this.routineAutomation}>Begin</Button></Row>
                            <div className="timer-seperator"></div>
                            <Row><Button className="routine-button" onClick={() => this.props.completeActivity(this.props.routine[0].id)}>Finish</Button></Row>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Home