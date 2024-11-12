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
                    className="nav-appLogo"
                    width={50}
                    height={50}
                />
            </Link>
            <div>
                <Link to="/home" className="nav-appLink">Home</Link>
            </div>
        </nav>
    );
}

export default Navbar;
