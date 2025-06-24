import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: "AKIARCYOGPT4HBLO4RPE",
    secretAccessKey: "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",
    region: "us-east-1"
});


const ses = AWS.SES({ apiVersion: "2010-12-01" });

const createEmailTemplate = () => {
    const params = {
        Template: {
            TemplateName: "WelcomeTemplate",
            SubjectPart: "Hello {{name}}!",
            HtmlPart: "<h1>Hi {{name}}</h1><p>Thanks for joining us!</p>",
            TextPart: "Hi {{name}}, thanks for joining us!"
        }
    }

    const response = ses.sendTemplatedEmail(params, (err, data) => {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            console.log(data);
        }
    });
}
