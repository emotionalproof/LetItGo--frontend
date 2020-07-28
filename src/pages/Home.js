import React, { Component } from 'react'
import HomeNavbar from '../components/HomeNavbar';
import RoutineSelectContainer from '../containers/RoutineSelectContainer'
import RoutineContainer from '../containers/RoutineContainer';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Home extends Component {
    state = {
        routine: [],
        user: {}
    }

    componentDidMount() {
        this.fetchUser()
        // this.fetchRoutine()
    }

    fetchUser = () => {
        const username = this.props.match.params.username
        fetch(`http://localhost:3002/api/v1/users/login/${username}`).then(resp => resp.json())
        .then(userData => this.setState({user: userData}))
        .then(() => this.fetchRoutine())
    }

    fetchRoutine = () => {
        fetch(`http://localhost:3002/api/v1/users/${this.state.user.id}/user_activities`).then(resp => resp.json()).then(routineData => this.setState({routine: routineData}))
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
            this.fetchRoutine()
            // this.setState(prevState => {
            //     console.log("prevstate after post", prevState.routine)
            //     return {
            //         routine: [...prevState.routine, userActObj]
            //     }
                
            // })
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
        .then(() => this.updateRoutine())
        // .then(resp => {
        //     this.setState(prevState => {
        //         prevState.routine.splice(userAct.position, 1)
        //             return{
        //                 routine: prevState.routine
        //             }
        //     })
            
        // })
        
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

    render() {
        console.log(this.state.routine)
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
                        <Col md={3} className="button-column"><button className="start-routine-button">Start Your Routine</button></Col>
                        <Col md={1} className="column-vertical-bar"></Col>
                        <Col md={3} className="routine-item-column"><RoutineContainer removeFromRoutine={this.removeFromRoutine} activities={this.props.activities} routine={this.state.routine}/></Col>
                    </Row>
                </Container>
                <div className="horizontal-bar"></div>
                <Container fluid className="activity-load-container">
                    <Row className="activity-load-row">
                        <Col md={1} className="column-vertical-bar"></Col>
                        <Col md={10} className="activity-load-column">Activity</Col>
                        <Col md={1} className="column-vertical-bar"></Col>
                    </Row>
                </Container>
                

            </>
        )
    }
}

export default Home