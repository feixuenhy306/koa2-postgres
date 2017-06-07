'use strict';
let amqp = require('amqplib/callback_api');

exports.init = function(db) {
    amqp.connect('amqp://localhost', function(err, conn) {
        if (err) {
            console.log(err);
        } else {
            conn.createChannel(function(err, ch) {

                if (err) {
                    console.log(err);
                } else {
                    var q = 'task_queue';

                    ch.assertQueue(q, {durable: true});
                    ch.prefetch(1);
                    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
                    ch.consume(q, function(msg) {
                        var str = msg.content.toString()

                        console.log("rec",str);
                    }, {noAck: false});
                }

            });
        }

    });
}
