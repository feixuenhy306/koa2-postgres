'use strict'
let nodemailer = require('nodemailer');
let config = require('./../config');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: config.app.email,
        pass: config.app.passwd
    }
});

exports.sendToAdmin = (err) => {
    let mailObject = {
        from: config.app.email,
        to: config.app.email,
        subject: "Error",
        text: err
    };

    transporter.sendMail(mailObject, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
};
