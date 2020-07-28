import React, { Component } from 'react'
import HomeNavbar from '../components/HomeNavbar';
import RoutineSelectContainer from '../containers/RoutineSelectContainer'
import RoutineContainer from '../containers/RoutineContainer';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



class Home extends Component {
    _isMounted = false

    state = {
        routine: [],
        user: {}
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
            this.setState(prevState => {
                return {
                    routine: [...prevState.routine, userActObj.activity_id]
                }
            })
        })
        // if (this.state.routine.length <= 9){
        // this.setState(prevState =>{
        //     return {
        //         routine: [...prevState.routine, id]
        //     }
        // })} else {
        //     alert("I'm sorry, you cannot add more than 10 items to your routine")
        // }
    }


    removeFromRoutine = index => {
        this.setState(prevState => {
           prevState.routine.splice(index, 1)
            return{
                routine: prevState.routine
            }
        })
    }

    componentDidMount() {
        this._isMounted = true
        this.fetchUser()
    }

    fetchUser = () => {
        const username = this.props.match.params.username
        console.log(username)
        fetch(`http://localhost:3002/api/v1/users/login/${username}`).then(resp => resp.json()).then(userData => this.setState({user: userData}))
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        // console.log("props", this.props)
        console.log('this.state', this.state)
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