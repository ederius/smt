"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const sendgrid = require("sendgrid");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const client = sendgrid("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");
function parseBody(body) {
    let helper = sendgrid.mail;
    let fromEmail = new helper.Email(body.from);
    let toEmail = new helper.Email(body.to);
    let subject = body.subject;
    let content = new helper.Content('text/html', body.content);
    let mail = new helper.Mail(fromEmail, subject, toEmail, content);
    return mail.toJSON();
}
exports.httpEmail = functions.https.onRequest((req, res) => {
    return Promise.resolve()
        .then(() => {
        if (req.method !== 'POST') {
            const error = new Error('Only POST requests are accepted');
            //error.code = 405;
            throw error;
        }
        const request = client.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: parseBody(req.body)
        });
        return client.API(request);
    })
        .then((response) => {
        if (response.body) {
            res.send(response.body);
        }
        else {
            res.end();
        }
    })
        .catch((err) => {
        console.error(err);
        return Promise.reject(err);
    });
});
//# sourceMappingURL=index.js.map