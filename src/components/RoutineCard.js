import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col'

const activities = [{name: "Breathe", id: 17}, {name: "Learn", id: 18}, {name: "Play", id: 19}, {name: "Walk", id: 20}, {name: "Remember", id: 21}, {name: "Select", id: 22}]


const RoutineCard = props => {
        const activity = activities.find(activity => activity.id === props.userAct.activity_id)
        return (
            <Col value={props.value} onClick={() => props.removeFromRoutine(props.userAct)} className="routine-item">
                {activity.name}
            </Col>

        )
}

export default RoutineCard



// const renderTooltip = (props) => (
//     <Tooltip className="tooltip" id="button-tooltip" {...props}>
//         Click to Remove from your Routine
//     </Tooltip>
// );

{/* <OverlayTrigger placement={this.props.index % 2 === 0 ? "left" : "right"} delay={{ show: 10, hide: 0 }} overlay={renderTooltip}> */}
// </OverlayTrigger>