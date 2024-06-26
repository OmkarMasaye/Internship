const express = require("express");
const mongoose = require("mongoose");
const User = require("./user");
const regis = express();
const port = 7000;

regis.use(express.json());

// const url = 'mongodb://localhost:27017/data'; // MongoDB connection URL

const url = 'mongodb+srv://vu1f2122078:LWj2CiCllYgnQvq6@cluster0.efaxvyh.mongodb.net/mydatabase'; // Replace with your MongoDB Atlas URL

mongoose.connect(url);

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});
// Endpoint to register a new user
regis.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Basic validation for required fields
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide username, email, and password' });
    }

    // Validation for email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Validation for password complexity (e.g., minimum length)
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    try {
        // Check if user with the same email already exists in MongoDB
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Insert new user document into MongoDB
        const newUser = { username, email, password };
        let result = new User(newUser);
        result = await result.save();

        // Respond with success message and the newly registered user
        res.status(201).json({ message: 'User registered successfully', result });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

regis.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
