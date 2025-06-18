import dotenv from 'dotenv';
import connectDB from './db/index.js';
import app from './app.js';
import serverlessExpress from '@codegenie/serverless-express';

dotenv.config(
    {
        path: './.env',
    }
);
await connectDB();

export const handler = serverlessExpress({ app });
