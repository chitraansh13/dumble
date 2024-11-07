import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

function Landing() {
    return (
        <div className="landingBody">
            <img src="/ellipse.png" alt="Ellipse" className="ellipseImage" />
            <img src="/landimg.png" alt="Running Woman" className="runningWomanImage" />
            <div className="largeText">DUMBLE.</div>
            <nav className="landingNav">
                <Link to="/">
                    <img
                        src="/logo192.png"
                        alt="logo"
                        className="App-logo"
                        width={50}
                        height={50}
                    />
                </Link>
                <div>
                    <Link to="/login" className="App-link">Login</Link>
                    <Link to="/register" className="App-link">Register</Link>
                    <Link to="/gymbro" className="App-link">Gymbro</Link>
                </div>
            </nav>
        </div>
    );
}

export default Landing;
