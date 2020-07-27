import React from 'react'
import { ActivityCard } from '../components/ActivityCard';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const RoutineSelectContainer = props => {
    return (
        <Container fluid className="routine-select-container">
            <Row >

                <Col><h2 className="routine-select-title">Moments</h2></Col>

                
            </Row>
            <Row className="routine-select-row"> 
                
            {props.activities.map(activity => 
                <ActivityCard 
                    name={activity.name}
                    key={activity.name}
                />
            )}
            </Row> 
        </Container>
    )
}


export default RoutineSelectContainer