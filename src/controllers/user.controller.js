// filepath: src/controllers/authController.js
import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Token expires in 1 hour
    });
};

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(400, " user already exist ");
        }

        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();

        res
            .status(201)
            .json(
                new ApiResponse(200, newUser, "the has successfully registered ")
            );
    } catch (error) {
        console.error('Error registering user:', error);
        throw new ApiError(400, error.message);
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(400, 'Invalid credentials');
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new ApiError(400, "invailid credentials");
        }

        // Generate token
        const token = generateToken(user._id);

        res
            .status(200)
            .json(
                new ApiResponse(200, {}, "login succesfull")
            );
    } catch (error) {
        console.error('Error logging in:', error);
        throw new ApiError(400, error.message);
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        // req.user should be set by authentication middleware
        const userId = req.user?.id;
        if (!userId) {
            throw new ApiError(440, " the userId not found")

        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new ApiError(400, "the user not found");
        }

        res
            .status(200)
            .json(
                new ApiResponse(200, user, "current user")
            );
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw new ApiError(400, error.message);
    }
}