import dotenv from 'dotenv';
import connectDB from './db/index.js';
import app from './app.js';


dotenv.config(
    { path: './.env', }
);

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();