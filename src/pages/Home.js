import React, { Component } from 'react'
import HomeNavbar from '../components/HomeNavbar';
import { Route, Switch} from 'react-router-dom';
import RoutineSelectContainer from '../containers/RoutineSelectContainer'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Home extends Component {
    state = {
        routine: []
    }




    render() {
        console.log(this.props)
        return (
            
            <div>
                <HomeNavbar />
                {/* {!this.props.loggedIn && this.props.history.push('/welcome')} */}
                <div className="horizontal-bar"></div>
                <Container fluid="md">
                    <Row>
                        <Col><RoutineSelectContainer activities={this.props.activities}/></Col>
                    </Row>
                </Container>
                <div className="horizontal-bar"></div>
                
                

            </div>
        )
    }
}


export default Home