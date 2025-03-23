import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/errorHandle.js';
import { asyncHandler } from '../utils/asyncHandle.js';
import { apiResponse } from '../utils/apiResponse.js';
import jwt from 'jsonwebtoken';


export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, phone_number } = req.body;
    console.log('Request body:', req.body); // Log the request body
    const userExists = await User.findOne({ email });
    console.log('User exists:', userExists); // Log if the user exists
    if (userExists) {
        return errorHandler(res, 'User already exists', 400);
    }
    try {
        const newUser = new User({
            username,
            email,
            password,
            phone_number
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();
        return apiResponse(res, 'User registered successfully', 201, newUser);
    } catch (err) {
        return errorHandler(res, 'Server Error', 500);
    }
});



export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log('Login request body:', req.body); // Log the request body
    const user = await User.findOne({ email });
    if (!user) {
        return errorHandler(res, 'Invalid email or password', 400);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return errorHandler(res, 'Invalid email or password', 400);
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('JWT Token:', token); // Log the JWT token
    return apiResponse(res, 'User logged in successfully', 200, { user, token });
});