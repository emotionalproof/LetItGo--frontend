import React, { Component } from 'react'
import RoutineItem from '../components/RoutineItem';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class RoutineContainer extends Component {
    render() {
        return (
            <Container fluid className="inner-routine-container">
                <Row className="inner-routine-row">
                {this.props.routine.map((id, index) => 
                    <RoutineItem 
                        index={index}
                        key={`${index}`.concat(`${id}`)}
                        id={id}
                        activities={this.props.activities}
                        removeFromRoutine={this.props.removeFromRoutine}
                    />
                )}
                </Row>
            </Container>
                
        )
    }
}

