const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
const bcrypt = require('bcrypt');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Exercise Schema
const exerciseSchema = new mongoose.Schema({
  day: { type: String, required: true },
  muscle: { type: String, required: true },
  name: { type: String, required: true }
});

// Diet Entry Schema
const dietEntrySchema = new mongoose.Schema({
  day: { type: String, required: true },
  mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Snack', 'Dinner'], required: true },
  foodItem: { type: String, required: true },
  calories: { type: Number, default: 0 }
});

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
  location: {
    type: String,
    default: null
  },
  age: {
    type: Integer,
    default: null
  },
  experience: {
    type: String,
    default: null
  },
  gender: {
    type: String,
    default: null
  },
  exercises: {
    type: [exerciseSchema],
    default: []
  },
  dietEntries: {
    type: [dietEntrySchema],
    default: []
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      uuid: uuidv4(),
      name,
      email,
      password: hashedPassword,
      bio: null,
      goal: null,
      location: null,
      age: null,
      experience: null,
      gender: null,   
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
        goal: savedUser.goal,
        location: savedUser.location,
        age: savedUser.age,
        experience: savedUser.experience,
        gender: savedUser.gender,
      },
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
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        bio: user.bio,
        goal: user.goal,
        location: user.location,
        age: user.age,
        experience: user.experience,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile endpoint
app.put('/api/users/:uuid/profile', async (req, res) => {
  try {
    const { bio, goal, location, age, experience, gender } = req.body;
    const { uuid } = req.params;

    const user = await User.findOneAndUpdate(
      { uuid },
      { $set: { bio, goal, location } },
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
        goal: user.goal,
        location: user.location,
        age: user.age,
        experience: user.experience,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's exercises
app.get('/api/users/:userId/exercises', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ uuid: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.exercises);
  } catch (error) {
    console.error('Get exercises error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add exercise to user
app.post('/api/users/:userId/exercises', async (req, res) => {
  try {
    const { userId } = req.params;
    const { day, muscle, name } = req.body;

    const user = await User.findOneAndUpdate(
      { uuid: userId },
      { $push: { exercises: { day, muscle, name } } },
      { new: true, select: '-password' }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.exercises);
  } catch (error) {
    console.error('Add exercise error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's diet entries
app.get('/api/users/:userId/diet', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ uuid: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.dietEntries);
  } catch (error) {
    console.error('Get diet entries error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add diet entry to user
app.post('/api/users/:userId/diet', async (req, res) => {
  try {
    const { userId } = req.params;
    const { day, mealType, foodItem, calories } = req.body;

    const user = await User.findOneAndUpdate(
      { uuid: userId },
      { $push: { dietEntries: { day, mealType, foodItem, calories } } },
      { new: true, select: '-password' }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.dietEntries);
  } catch (error) {
    console.error('Add diet entry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all gymbros for recommendations
app.get('/api/recommendations', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching gymbros:', error);
    res.status(500).json({ message: 'Failed to fetch gymbros' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});