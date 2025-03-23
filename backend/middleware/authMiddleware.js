import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/errorHandle.js';

const verifyUser = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return errorHandler(res, 'Access denied. No token provided.', 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return errorHandler(res, 'Invalid token.', 400);
    }
};

export default verifyUser;