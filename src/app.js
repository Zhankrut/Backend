import courseRoutes from './routes/course.route.js';
import userRoutes from "./routes/user.route.js"
import cookieParser from 'cookie-parser';
import express from 'express';


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/courses', courseRoutes);
app.use('/api/auth', userRoutes);

app.get('/', (req, res) => {
    res
        .status(200)
        .json({ message: " the api version 1.0.0" }

        );
})

export default app;