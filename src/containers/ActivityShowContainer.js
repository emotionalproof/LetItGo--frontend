import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/esm/Button'
import Breathe from '../components/activities/BreatheComponent';

class ActivityShowContainer extends Component {

    state = {
        activity: "button"
    }

    componentDidMount() {
        console.log(this.props.routine)
    }

    // routineAutomation = () => {
    //     let activityName = "empty"
    
    //     }
        // let activityName = this.props.nextActivity

    

    render() {
        return (
            <Container fluid className="activity-load-container">
                <Row className="activity-load-row">
                    <Col md={1} className="column-vertical-bar"></Col>
                    <Col md={10} className="activity-load-column">
                    {console.log(this.props.routine[0])}
                    
                    </Col>
                    <Col md={1} className="column-vertical-bar">
                        <Row><Button className="routine-button" onClick={this.routineAutomation}>Begin</Button></Row>
                        <div className="timer-seperator"></div>
                        <Row><Button className="routine-button" onClick={() => this.props.completeActivity(this.props.routine[0].id)}>Finish</Button></Row>
                        
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ActivityShowContainer