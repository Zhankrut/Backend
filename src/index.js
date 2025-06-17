import express from 'express';
import dotenv from 'dotenv';
import courseRoutes from './routes/course.route.js';
import userRoutes from "./routes/user.route.js"
import connectDB from './db/index.js';
import { errorHandler } from './utils/errorHandle.js';
dotenv.config(
    { path: './.env', }
);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/auth', userRoutes);

app.use(errorHandler);

// Database connection
connectDB();

// Start server
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();