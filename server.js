// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    uuid: { 
        type: String, 
        required: true, 
        unique: true, 
        default: uuidv4 
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    bio: { 
        type: String, 
        default: null 
    },
    goal: { 
        type: String, 
        default: null 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create new user with UUID
        const user = new User({
            uuid: uuidv4(),
            name,
            email,
            password,
            bio: null,
            goal: null
        });

        const savedUser = await user.save();
        
        res.status(201).json({ 
            message: 'Registration successful',
            user: {
                id: savedUser._id,
                uuid: savedUser.uuid,
                name: savedUser.name,
                email: savedUser.email,
                bio: savedUser.bio,
                goal: savedUser.goal
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // If user doesn't exist
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if password matches
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Send back user data (excluding password)
        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                uuid: user.uuid,
                name: user.name,
                email: user.email,
                bio: user.bio,
                goal: user.goal
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update profile endpoint
app.put('/api/users/:uuid/profile', async (req, res) => {
    try {
        const { bio, goal } = req.body;
        const { uuid } = req.params;

        const user = await User.findOneAndUpdate(
            { uuid },
            { $set: { bio, goal } },
            { new: true, select: '-password' }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'Profile updated successfully',
            user: {
                uuid: user.uuid,
                name: user.name,
                email: user.email,
                bio: user.bio,
                goal: user.goal
            }
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});