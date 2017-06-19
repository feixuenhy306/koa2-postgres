'use strict';

let amqp = require('amqplib');
let pino = require('pino')();
let task = require('./periodicTask');

module.exports = init;

async function init(db){
    let ch = await rabitConnection(db);
    task.init(db, ch);
}

async function rabitConnection(db) {
    try {
        let amqpConn = await amqp.connect('amqp://localhost');

        amqpConn.on("error", function(err) {
            if (err.message !== "Connection closing") {
                pino.error("[AMQP] conn error", err.message);
                setTimeout(function(){
                    init(db)
                }, 100);
            }

        }).on("close", function() {
            pino.error("[AMQP] reconnecting");
            setTimeout(function(){
                init(db)
            }, 100);
        });

        let channel = await amqpConn.createChannel();

        channel.on('close', function() {
            pino.error("occuring error in the channel");
        }).on('error', function(err) {
            pino.error("server closed this channel ", err);
        });

        return channel;
    } catch (err) {
        pino.error("error in rabbitMQ connectng", err);
    }
}
