import React, { Component } from 'react'
import RoutineCard from '../components/RoutineCard';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RoutineContainer from './RoutineContainer';


class RoutineIndexContainer extends Component {
    render() {
        return (
            <Container fluid className="routine-container" >
                <Row className="routine-row">
                    <Col md={1} className="column-vertical-bar"></Col>
                    <Col md={3} onClick={this.props.nextActivity}className="button-column"><button className="start-routine-button">Start Your Routine</button></Col>
                    <Col md={1} className="column-vertical-bar"></Col>
                    <Col md={3} className="routine-item-column">
                        <RoutineContainer removeFromRoutine={this.props.removeFromRoutine} activities={this.props.activities} routine={this.props.routine}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}




export default RoutineIndexContainer