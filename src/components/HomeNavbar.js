import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/esm/Button'
import Nav from 'react-bootstrap/Nav'


const HomeNavbar = props => {

    const handleClick = () => {
        props.handleLogout()
        props.history.push('/welcome')
    }

    console.log(props)
    return (
        <Navbar expand="lg" variant="dark" className="navbar">
            <Navbar.Brand href="#home" className="navbar-content">
                Let It G
                <img
                    alt=""
                    src="welcome.png"
                    className="d-inline-block align-top navbar-img"
                />{' '} 
            </Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>
            <Nav>
                <Button variant="link" className="logout" onClick={handleClick}>Logout</Button>
            </Nav>
        </Navbar>
      
    )
}

export default HomeNavbar;

{/* <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/activities">activities</Link>
            <Link to="/login">Login</Link>
        </div> */}