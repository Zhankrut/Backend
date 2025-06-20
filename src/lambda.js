import dotenv from 'dotenv';
import connectDB from './db/index.js';
import app from './app.js';
import serverless from 'serverless-http';

dotenv.config({ path: './.env' });

// Ensure DB is connected before handling requests
let isConnected = false;
const connectIfNeeded = async () => {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
};

const handler = serverless(app, { provider: 'aws' });

export const funcName = async (event, context) => {
    try {
        await connectIfNeeded();
        return await handler(event, context);
    } catch (err) {
        console.error('Lambda handler error:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
        };
    }
};
