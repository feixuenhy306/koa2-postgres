'use strict';

let config = require('./config'),
    redis = require('./utils/redis'),
    db = require('./model'),
    email = require('./utils/email'),
    task = require('./rabbitmq/periodicTask'),
    rabbitMQ = require('./rabbitmq'),
    numCPUs = require('os').cpus().length,
    pino = require('pino')(),
    cluster = require('cluster'),
    http = require('https'),
    fs = require('fs');

if (cluster.isMaster) {
    options = {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('key-cert.pem')
    };
    for (var i = 0; i < 1; i++) {
        cluster.fork();
    }
} else {
    let koa = require('./middleware/koa');
    var options;
    options = {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('key-cert.pem')
    };

    // http.createServer(options, function(req, res) {
    //     res.writeHead(200);
    //     res.end("hello world\n");
    // }).listen(4444);
    http.createServer(options, koa.app.callback()).listen(3000);
}

serverConfiguration();

async function serverConfiguration() {
    redis.init(config);
    rabbitMQ(db);
}

process.on('uncaughtException', function(err) {
    pino.error("uncaughtException", err);
    //email.sendToAdmin(err);

}).on('uncaughtRejection', function(err) {

    pino.error("uncaughtRejection: ", err);
    //email.sendToAdmin(err);
})
