import React, { Component } from 'react'
import RoutineCard from '../components/RoutineCard';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const activities = [{name: "Breathe", id: 17}, {name: "Learn", id: 18}, {name: "Play", id: 19}, {name: "Walk", id: 20}, {name: "Remember", id: 21}, {name: "Select", id: 22} ]


export default class RoutineContainer extends Component {

    makeKey = userAct => {
        let actName = activities.find(activity => activity.id === userAct.activity_id).name
        let serial = [userAct.id, 0, userAct.activity_id, 0, userAct.user_id].join('')
        let key = [serial, actName].join('')
        return key
    }

    render() {
        let routine = this.props.userActivities.filter(userActivity => userActivity.completed === false)
        let sortedRoutine = routine.sort((a, b) => a.position - b.position)
        return (
            <Container fluid className="inner-routine-container">
                <Row className="inner-routine-row">
                {sortedRoutine.map(userAct => 
                    <RoutineCard
                        key={this.makeKey(userAct)}
                        id={userAct.id}
                        value={this.makeKey(userAct)}
                        userAct={userAct}
                        activities={activities}
                        removeFromRoutine={this.props.removeFromRoutine}
                    />
                )}
                </Row>
            </Container>
                
        )
    }
}

