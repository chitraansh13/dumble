import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';

function Login() {
    return (
        <div className="glass-bg">
            <h1>Log in to your account.</h1>
            <form method="POST">
                <div className="text-input">
                    <input type="text" placeholder="Email" name="email" />
                    <br /><br />
                    <input type="password" placeholder="Password" name="password" />
                </div>
                <div className="submit-buttons">
                    <Link to="/gymbro" className='loginButton'>Login</Link>
                    <a href="/register">New? Register here</a>
                </div>
            </form>
        </div>
    );
}

export default Login;
