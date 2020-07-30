import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Auth = props => {
    // console.log(props)
    return (
        <Container className="auth-container">
            <Row className="form-row">
                <Col xs={5} className="formContainer"><LoginForm handleLogin={props.handleLogin} {...props.history}/></Col>
                <Col></Col>
                <Col xs={5} className="formContainer"><RegisterForm handleLogin={props.handleLogin} {...props.history}/></Col>
            </Row>
            <Row className="auth-footer"></Row>
        </Container>
    )
}

export default Auth