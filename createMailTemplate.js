import { CreateTemplateCommand, SESClient } from '@aws-sdk/client-ses';
import dotenv from 'dotenv';

dotenv.config(
    { path: './.env', }
);

const config = {
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY_ID,
    }
}

const ses = new SESClient(config);

const createEmailTemplate = async () => {
    const params = {
        Template: {
            TemplateName: "WelcomeTemplate",
            SubjectPart: "Hello {{name}}!",
            HtmlPart: "<h1>Hi {{name}}</h1><p>Thanks for joining us!</p>",
            TextPart: "Hi {{name}}, thanks for joining us!"
        }
    }

    try {
        const command = new CreateTemplateCommand(params);
        const data = await ses.send(command);
        console.log("template created", data);
    } catch (err) {
        console.log('error creating template:', err);
    }
}

createEmailTemplate();
