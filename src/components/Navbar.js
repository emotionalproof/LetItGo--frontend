import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/activities">activities</Link>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Navbar;