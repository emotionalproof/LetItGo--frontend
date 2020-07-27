import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



const Welcome = (props) => {
    console.log(props)
    return (

        <Container fluid className="welcome-container">
            <Row>
                <Col> 
                    <img onClick={() => props.history.push('/login')} className="welcome-img" src='welcome.png' alt="Welcome"/>
                </Col>
            </Row>
        </Container>
    )
}

export default Welcome