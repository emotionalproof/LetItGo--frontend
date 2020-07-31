import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RoutineContainer from './RoutineContainer';
import RoutineSelectContainer from './RoutineSelectContainer';
import ActivityShowContainer from './ActivityShowContainer';
import Button from 'react-bootstrap/Button'


// const activities = [{name: "Breathe", id: 17}, {name: "Learn", id: 18}, {name: "Play", id: 19}, {name: "Walk", id: 20}, {name: "Remember", id: 21}, {name: "Select", id: 22}  ]


class RoutineIndexContainer extends Component {

    state = {
        userActivities: [],
        routineStart: false,
        routine: [],
        activities: []
        
    }

    componentDidMount() {
        this.fetchUserActivities()
    }
   

    fetchUserActivities = () => {
        const username = this.props.match.params.username
        this.props.loggedIn && fetch(`http://localhost:3002/api/v1/user_activities/user/${username}`)
        .then(resp => resp.json())
        .then(userActivitiesData => {
            this.setState({userActivities: userActivitiesData})
            let routine = userActivitiesData.filter(userActivity => userActivity.completed === false).sort((a, b) => a.position - b.position)
            this.setState({routine: routine})
        })
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
                user_id:    this.props.user.id,
                activity_id: id
            })
        })
        .then(resp => resp.json())
        .then(userActObj => {
            // this.fetchRoutine()
            // this.setState(prevState => {
            //     return {routine: [...prevState.routine, userActObj]}})
            this.fetchUserActivities()
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
                prevState.routine.splice(userAct.position, 1)
                    return{routine: prevState.routine}})
            this.fetchUserActivities()
            this.updateRoutine(userAct.position)
        }) 
    }

    updateRoutine = position => {
        let routine = this.state.routine //.filter(userActivity => userActivity.position > position)
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
            this.fetchUserActivities()
        })
        )
    }

    startRoutine = () => {
        this.state.routineStart === false && this.setState({routineStart: true})
    }

    nextActivity = id => {
        // this.setState(prevState => {
        //     prevState.routine.splice(0, 1)
        //     return{routine: [...prevState.routine]}
        // })
        this.state.routineStart === true && this.completeActivity(id)
    }

    completeActivity = () => {
        let id = this.state.routine[0].id
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
            this.fetchUserActivities()
            this.state.routine.length === 1 && this.setState({routineStart: false})
        })
    }

    render() {
        return (
            <>
                <div className="horizontal-bar"/>
                <RoutineSelectContainer loggedIn={this.props.loggedIn} addToRoutine={this.addToRoutine}/>
                <div className="horizontal-bar"/>
                <Container fluid className="routine-container" >
                    <Row className="routine-row">
                        <Col md={1} className="column-vertical-bar"></Col>
                        <Col md={2}></Col>
                        <Col md={3} className="button-column"><Button variant="link" onClick={this.startRoutine} className="start-routine-button">Start Routine</Button></Col>
                        
                        <Col md={6} className="routine-item-column">
                            <RoutineContainer loggedIn={this.props.loggedIn} displayRoutine={!this.state.routineStart} removeFromRoutine={this.removeFromRoutine} userActivities={this.state.userActivities}/>
                        </Col>
                    </Row>
                </Container>
                <div className="horizontal-bar"/> 
                <ActivityShowContainer loggedIn={this.props.loggedIn} user={this.props.user} routineStart={this.state.routineStart} nextActivity={this.nextActivity} routine={this.state.routine}/>
            </>
        )
    }
}




export default RoutineIndexContainer