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
            <img
                src="/logo512.png"
                alt="profile"
                className="pfp"
                width={40}
                height={40}
            />
            <div>
                <Link to="/profile" className="appLink">Profile</Link>
            </div>
        </nav>
    );
}

export default Navbar;
