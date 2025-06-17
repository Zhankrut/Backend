import express from 'express';
import dotenv from 'dotenv';
import courseRoutes from './routes/course.route.js';
import userRoutes from "./routes/user.route.js"
import connectDB from './db/index.js';
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

app.get('/', (req, res) => {
    res
    .status(200)
    .json({message: " the api version 1.0.0"}

    );
})

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