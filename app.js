'use strict';

let config = require('./config'),
    redis = require('./utils/redis'),
    db = require('./model'),
    email = require('./utils/email'),
    task = require('./rabbitmq/periodicTask'),
    rabbitMQ = require('./rabbitmq'),
    numCPUs = require('os').cpus().length,
    pino = require('pino')(),
    cluster = require('cluster');

if (cluster.isMaster) {
    for (var i = 0; i < 1; i++) {
        cluster.fork();
    }
} else {
    require('./middleware/koa');
}

serverConfiguration();

async function serverConfiguration() {
    redis.init(config);
    rabbitMQ(db);
}

process.on('uncaughtException', function(err) {
    pino.error("uncaughtException", err);
    email.sendToAdmin(err);

}).on('uncaughtRejection', function(err) {

    pino.error("uncaughtRejection: ", err);
    email.sendToAdmin(err);
})
