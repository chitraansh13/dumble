import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './register';
import Login from './login';
import './landing.css';
import Gymbro from './gymbro';


function Landing() {
    return <Router>
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

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/gymbro" element={<Gymbro />} /> {/* This is the new route */}
                <Route path="/" />
            </Routes>

        </div>
    </Router>;
}

export default Landing;
