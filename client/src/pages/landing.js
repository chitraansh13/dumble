import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

function Landing() {
    return (
        <div className="landingBody">
            <img src="/landingEllipse.png" alt="Ellipse" className="ellipseImage" />
            <img src="/landingRunning.png" alt="Running Woman" className="runningWomanImage" />
            <div className="largeText">DUMBLE.</div>
            <nav className="landingNav">
                <Link to="/">
                    <img
                        src="/image.png"
                        alt="logo"
                        className="appLogo"
                    />
                </Link>
                <div>
                    <Link to="/login" className="appLink">Login</Link>
                    <Link to="/register" className="appLink">Register</Link>
                    <Link to="/gymbro" className="appLink">Gymbro</Link>
                </div>
            </nav>
        </div>
    );
}

export default Landing;
