import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'



export class ActivityCard extends Component {
   
    render() {
        const renderTooltip = (props) => (
            <Tooltip className="tooltip" id="button-tooltip" {...props}>
                Click to Add to your Routine
            </Tooltip>
            );

        return (
            <>
            <OverlayTrigger placement="bottom" delay={{ show: 30, hide: 10 }} overlay={renderTooltip}>
                
                <Col className="routine-select-column">
                    <Card onClick={() => this.props.addToRoutine(this.props.id)} className="activity-card">
                        <Card.Body className="activity-card-body">{this.props.name}</Card.Body>
                    </Card>
                </Col>
                
            </OverlayTrigger>
            </>
        )
    }
}

