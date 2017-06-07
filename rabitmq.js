#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q = 'rpc_queue';

        ch.assertQueue(q, {durable: false});
        ch.prefetch(1);
        console.log(' [x] Awaiting RPC requests');
        ch.consume(q, function reply(msg) {
            var n = msg.content.toString();

            var len = n.length;
            for (var i = len - 1; i >= 0; i--) {
                if (n[i] === ' ' && (n[i] < '0' || n[i] > '9')) break;
                }

            var str = n.substring(i, len);
            var n = parseInt(str)
                ? n.substring(0, i + 1) + (parseInt(str) + 1)
                : n + " " + 1;

            console.log(n);
            ch.sendToQueue(msg.properties.replyTo, new Buffer(n), {correlationId: msg.properties.correlationId});

            ch.ack(msg);
        });
    });
});
