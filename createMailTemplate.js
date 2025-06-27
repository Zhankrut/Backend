import { CreateTemplateCommand, SESClient } from '@aws-sdk/client-ses';

const config = {
    region: "us-east-1",
    credentials: {
        accessKeyId: "AKIARCYOGPT4AMAOV7VE",
        secretAccessKey: "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",
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

    try{
        const command = new CreateTemplateCommand(params);
        const data = await ses.send(command);
        console.log("template created", data);
    }catch(err){
        console.log('error creating template:', err);
    }
}

createEmailTemplate();
