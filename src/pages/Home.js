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
import Walk from '../components/activities/Walk';
import Select from '../components/activities/Select';
import RoutineIndexContainer from '../containers/RoutineIndexContainer';

const activities = [{name: "Breathe", id: 17}, {name: "Learn", id: 18}, {name: "Play", id: 19}, {name: "Walk", id: 20}, {name: "Remember", id: 21}, {name: "Select", id: 22} ]

class Home extends Component {
    state = {
        routine: [],
        routineActivities: [17, 18, 19, 20],
        user: {},
        displayRoutine: true,
        activities: [],
        routineStart: false
    }

    componentDidMount() {
        this.fetchUser()
        this.fetchActivities()

    }

    fetchUser = () => {
        const username = this.props.match.params.username
        fetch(`http://localhost:3002/api/v1/users/login/${username}`).then(resp => resp.json())
        .then(userData => {
            this.setState({user: userData})
            this.renderUserActivities(this.state.user.user_activities)
            })
    }

    renderUserActivities = userActivityArray => {
        let newArray = userActivityArray.filter(userAct => userAct.completed === false)
        this.setState({routine: newArray})
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
        .then(this.updateRoutine)
        
    }

    
    updateRoutine = () => {
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

 
//ANCHOR automation
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
        const routineLength = this.state.routine.length
        // routineLength < 1 || routineLength === undefined ? 
        const firstRoutine = (this.state.routine[0] === undefined ? 
            22 : this.state.routine.sort((a, b) => a.position - b.position)[0].activity_id)
        const activityName = activities.find(activity => activity.id === firstRoutine).name
        console.log(activityName)
        return activityName
    }

    nextActivity = () => {
        this.setState(prevState => {
            prevState.routine.splice(0, 1)
            return{
                routine: [...prevState.routine]
            }
        })
    }

    changeToComplete = routineItem => {
        fetch(`http://localhost:3002/api/v1/user_activities/${routineItem.id}`,{
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
    

    render() {
        const next = this.renderRoutineActivities()
        return (
            <>
                <HomeNavbar />
                {/* {!this.props.loggedIn && this.props.history.push('/welcome')} */}
                <div className="horizontal-bar"/>
                <RoutineSelectContainer activities={this.props.activities} addToRoutine={this.addToRoutine}/>
                <div className="horizontal-bar"/>
                <RoutineIndexContainer nextActivity={this.nextActivity} removeFromRoutine={this.removeFromRoutine} activities={activities} routine={this.state.routine}/>
                <div className="horizontal-bar"/>    
                <Container fluid className="activity-load-container">
                    <Row className="activity-load-row">
                        <Col md={1} className="column-vertical-bar"></Col>
                        <Col md={10} className="activity-load-column">
                        {next === "Select" ?
                        <Select /> : this.state.routineStart === false ? 
                        <Select /> : this.renderRoutineActivities() === "Breathe" ? 
                        <BreatheComponent /> : this.renderRoutineActivities() === "Walk" ? 
                        <Walk />: this.renderRoutineActivities() === "Remember" ? 
                        <Remember /> : this.renderRoutineActivities() === "Learn" ? <Learn /> : <PlayPiano />}
                        </Col>
                        <Col md={1} className="column-vertical-bar">
                            <Row></Row>
                            <div className="timer-seperator"></div>
                            <Row><Button className="routine-button" onClick={this.nextActivity}>Finish</Button></Row>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Home