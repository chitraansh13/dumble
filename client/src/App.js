import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Register from './pages/register';
import Login from './pages/login';
import Gymbro from './pages/gymbro';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/gymbro" element={<Gymbro />} />
            </Routes>
        </Router>
    );
}

export default App;
