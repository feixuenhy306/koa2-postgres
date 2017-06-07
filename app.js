'use strict';

let app = require('./middleware/koa'),
    config = require('./config'),
    redis = require('./utils/redis'),
    db = require('./model'),
    email = require('./utils/email'),
    task = require('./rabbitmq/p2');

process.on('uncaughtException', function(err) {
    console.log(err);
    email.sendToAdmin(err);
})

process.on('uncaughtRejection', function(err) {
    console.log(err);
    email.sendToAdmin(err);
})

process.on('exit', function(code) {
    console.log('About to exit with code:', code);
    email.sendToAdmin(code);
});

serverConfiguration();

function serverConfiguration() {
    redis.init(config);
    task.init(db);
}
