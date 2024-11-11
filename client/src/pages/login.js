import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';

function Login() {
    return ( 
        <div className="glass-bg">
            <h1>Login your account.</h1>
            <form method="POST">
                <div className="text-input">
                    <input type="text" placeholder="Email" name="email" />
                    <br /><br />
                    <input type="password" placeholder="Password" name="password" />
                </div>
                <div>
                    <Link to="/gymbro" className='loginButton'>Login</Link>
                    
                </div>
            </form>
        </div>
    );
}

export default Login;
