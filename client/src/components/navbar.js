import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
    return (
        <nav className="nav">
            <Link to="/">
                <img
                    src="/logo192.png"
                    alt="logo"
                    className="appLogo"
                    width={50}
                    height={50}
                />
            </Link>
            <div>
                <Link to="/login" className="appLink">Login</Link>
                <Link to="/register" className="appLink">Register</Link>
                <Link to="/gymbro" className="appLink">Gymbro</Link>
            </div>
        </nav>
    );
}

export default Navbar;
