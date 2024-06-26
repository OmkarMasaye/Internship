// models/User.js

const mongoose = require('mongoose');

// Define schema for user document
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Create and export User model based on schema
const User = mongoose.model('User', userSchema);
module.exports = User;
