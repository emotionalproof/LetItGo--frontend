import React, { Component } from 'react'
import RoutineItem from '../components/RoutineItem';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

export default class RoutineContainer extends Component {
    render() {
        return (
            <Container fluid className="inner-routine-container">
                <Row className="inner-routine-row">
                {this.props.routine.map((userAct, index) => 
                    <RoutineItem 
                        index={index}
                        key={`${index}`.concat(`${userAct.id}`)}
                        userAct={userAct}
                        activities={this.props.activities}
                        removeFromRoutine={this.props.removeFromRoutine}
                    />
                )}
                </Row>
            </Container>
                
        )
    }
}

