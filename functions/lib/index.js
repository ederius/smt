'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    },
});
exports.emailNotificationPathers = functions.https.onRequest((req, res) => {
    console.log("llego solicitud");
    console.log(req.body);
    // The user subscribed to the newsletter.
    const mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.content
    };
    mailTransport.sendMail(mailOptions).then(() => {
        console.log('New welcome email sent to:');
        res.send({ message: "hola mundo" });
    }).catch(error => {
        res.status(400).send({ error: error });
    });
});
//# sourceMappingURL=index.js.map