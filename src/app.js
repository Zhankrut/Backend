import courseRoutes from './routes/course.route.js';
import userRoutes from "./routes/user.route.js"
import cookieParser from 'cookie-parser';
import express from 'express';
import { SESClient, SendBulkTemplatedEmailCommand } from '@aws-sdk/client-ses';


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/courses', courseRoutes);
app.use('/api/auth', userRoutes);

app.get('/', (req, res) => {
    res
        .status(200)
        .json(
            { message: " the api version 1.0.0" }
        );
})

app.post("/sendEmail", async (req, res) => {
    /*
    [
        { "email": "alice@example.com", "name": "Alice" },
        { "email": "bob@example.com", "name": "Bob" }
    ]
    */
    const config = {
        region: "us-east-1",
        credentials: {
            accessKeyId: "AKIARCYOGPT4AMAOV7VE",
            secretAccessKey: "N11DhOLL4bfB/ubtE7+tlsmbwPMJmu1qLql6kElu",
        }
    }

    const ses = new SESClient(config);

    let users = req.body;

    if (typeof users === "string") {
        try {
            users = JSON.parse(users);
        } catch (e) {
            return res.status(400).json({ message: "Invalid JSON body" });
        }
    }

    console.log(!Array.isArray(users));

    if (!Array.isArray(users) || users.length === 0) {
        return res.status(400).json({ message: "No recipients provided" });
    }

    if (users.length > 50) {
        return res.status(400).json({ message: "Max 50 recipients per call" });
    }

    const destinations = users.map(user => ({
        Destination: {
            ToAddresses: [user.email],
        },
        ReplacementTemplateData: JSON.stringify({ name: user.name })
    }));

    const params = {
        Source: "zhankrutverma2802@gmail.com",
        Template: "WelcomeTemplate",
        Destinations: destinations,
        DefaultTemplateData: JSON.stringify({ name: "Customer" }),
    };

    try {
        const command = new SendBulkTemplatedEmailCommand(params);
        const result = await ses.send(command);
        res.status(200).json({ success: true, result });
    } catch (err) {
        console.error("SES error", err);
        res.status(500).json({ message: "Failed to send emails", error: err.message });
    }
});

export default app; 