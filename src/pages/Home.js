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
        const help = (this.state.routine[0] === undefined ? 
            22 : this.state.routine.sort((a, b) => a.position - b.position)[0].activity_id)
        // console.log("routine:", this.state.routine)
        const activityName = activities.find(activity => activity.id === help).name
        return activityName
        // const activityId = currentRoutineItem.activity_id
        // const activity = activities.find(activity => activity.id === activityId)
        // activityId
    }

    nextActivity = () => {
        // this.setState({routineStart: true})
        // (this.state.routine !== undefined ? this.changeToComplete(this.state.routine[0] ) : null)
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
                        <Col md={3} className="routine-item-column"><RoutineContainer removeFromRoutine={this.removeFromRoutine} activities={activities} routine={this.state.routine}/></Col>
                    </Row>
                </Container>
                <div className="horizontal-bar"></div>    
                <Container fluid className="activity-load-container">
                    <Row className="activity-load-row">
                        <Col md={1} className="column-vertical-bar"></Col>
                        <Col md={10} className="activity-load-column">
                        {this.renderRoutineActivities() === "Select" ?
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