'use strict'
let email = require('./email');
let config = require('./../config');

module.exports = (ctx, err) => {
    sendMail(ctx, err);
    return err.message;
}

function sendMail(ctx, err) {
    try {
        let errorMsg = "Url: " + ctx.request.url + "\nMethod: " + ctx.request.method + "\nError: " + err;
        email.sendToAdmin(errorMsg);
    } catch (err) {
        ctx.log.info(err);
    }
}
