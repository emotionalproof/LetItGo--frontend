import React from 'react'
import { ActivityCard } from '../components/ActivityCard';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'




const RoutineSelectContainer = props => {

    const activities = [{name: "Breathe", id: 17}, {name: "Learn", id: 18}, {name: "Play", id: 19}, {name: "Walk", id: 20}, {name: "Remember", id: 21}, {name: "Select", id: 22} ]

    return (
        <Container  fluid="lg" className="home-top-container routine-select-container">
            <Row className="routine-select-title"><Col><h2 id="activity-select-title">Moments</h2></Col></Row>
            <Row className="routine-select-row">  
                <Col sm={1}></Col>
                {props.loggedIn && activities.filter(activity => activity.name !== "Select").map(activity => 
                    <ActivityCard 
                        name={activity.name}
                        key={activity.name}
                        id={activity.id}
                        addToRoutine={props.addToRoutine}
                    />
                )}
                <Col sm={1}></Col>
            </Row> 
        </Container>
    )
}


export default RoutineSelectContainer