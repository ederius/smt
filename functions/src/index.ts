'use strict';


import * as functions from 'firebase-functions';
import * as nodemailer from "nodemailer";
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});
const app = express();


app.use(cors);
app.use(cookieParser);

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
    pass: gmailPassword,
  },
});

app.post('/emailNotificationPathers', (req, res)=>{
  
  // setup email data with unicode symbols
  const mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.content
  };

  // send mail with defined transport object
  mailTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          res.status(400).send({error:error, message:"Error"});
      }
      res.send({send:true, info:info })
      //console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
});



