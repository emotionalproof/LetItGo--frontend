import React from 'react';
import Navbar from 'react-bootstrap/Navbar'


const HomeNavbar = props => {
    console.log(props)
    return (
        <Navbar variant="dark" className="navbar">
            <Navbar.Brand href="#home" className="navbar-content">
            Let It G
            <img
                alt=""
                src="welcome.png"
                className="d-inline-block align-top navbar-img"
            />{' '}
            
            </Navbar.Brand>
            
        </Navbar>
      
    )
}

export default HomeNavbar;

{/* <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/activities">activities</Link>
            <Link to="/login">Login</Link>
        </div> */}