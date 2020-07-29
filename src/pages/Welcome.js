import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'



const Welcome = (props) => {
    return (
        <>
            <div className="header" fixed="bottom"></div>
            <Container fluid className="welcome-container">
                <Row>
                    <Col> 
                        <img onClick={() => props.history.push('/login')} className="welcome-img" src='welcome.png' alt="Welcome"/>
                    </Col>
                </Row>
            </Container>
            <div className="footer" fixed="bottom"></div>
        </>
    )
}

export default Welcome