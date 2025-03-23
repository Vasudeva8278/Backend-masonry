import dotenv from 'dotenv';
import connectDB from './config/db.config.js';
import app from './app.js';

dotenv.config({ path: './.env' });

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(`Unable to connect to MongoDB server: ${err}`);
    });

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});