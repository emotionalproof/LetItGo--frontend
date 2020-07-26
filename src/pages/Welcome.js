import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Login } from './Auth';



const Welcome = (props) => {
    console.log(props)
    return (

        <Container fluid>
            <Row>
                <Col> 
                    <img onClick={() => props.history.push('/login')} className="welcome-img" src='Untitled_Artwork.png' alt="Welcome"/>
                </Col>
            </Row>
        </Container>
    )
}

export default Welcome