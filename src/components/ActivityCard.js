import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'


export const ActivityCard = props => {
    console.log(props)
    return (
        <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">Click to Add to your Routine</Tooltip>}
        >
        {({ ref, ...triggerHandler }) => (
        <Col variant="dark"
        {...triggerHandler}
        className="d-inline-flex align-items-center"
         className="routine-select-column">
            <Card className="activity-card" ref={ref}>
                <Card.Body>{props.name}</Card.Body>
            </Card>
        </Col>
        )}
    </OverlayTrigger>
    )
}
