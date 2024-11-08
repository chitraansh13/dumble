import React from 'react';
import { Link } from 'react-router-dom';
import './register.css';

function Home() {
    return ( 
        <div className="glass-bg">
            <h1>Register your account.</h1>
            <form method="POST">
                <div className="text-input">
                    <input type="text" placeholder="Name" name="name" />
                    <br /><br />
                    <input type="text" placeholder="Email" name="email" />
                    <br /><br />
                    <input type="password" placeholder="Password" name="password" />
                </div>
                <div>
                    <Link to="/gymbro" className='loginButton'>Register</Link>
                    
                </div>
            </form>
        </div>
    );
}

export default Home;
