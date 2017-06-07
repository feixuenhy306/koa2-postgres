'use strict';
let cron = require('node-cron');
var amqp = require('amqplib/callback_api');

exports.init = function(db) {
    let i = 0;
    let task = cron.schedule('0-59 * * * *', function() {

        db.query('select name, email from users').then((data) => {

            for (let i = 0; i < data.length; i++) {

                if (!data[i].name)
                    continue;

                amqp.connect('amqp://localhost', function(err, conn) {

                    conn.createChannel(function(err, ch) {

                        ch.assertQueue('', {
                            exclusive: true
                        }, function(err, q) {
                            var corr = generateUuid();
                            console.log("user name", data[i].name);

                            ch.consume(q.queue, function(msg) {

                                if (msg.properties.correlationId === corr) {
                                    let str = msg.content.toString();
                                    console.log(' [.] Got %s', str);

                                    setTimeout(function() {
                                        conn.close();
                                        db.query('update users  set name = $1 where email = $2', [str, data[i].email]);
                                    }, 500);

                                }
                            }, {noAck: true});

                            ch.sendToQueue('rpc_queue', new Buffer(data[i].name), {
                                correlationId: corr,
                                replyTo: q.queue
                            });
                        });
                    });
                });
            }

        }).catch(err => {
            console.log("error in periodicTask", err);
        });

        console.log('running a task every minute');

    }, true);
    //task.stop();
    task.start();
    console.log("task started!!");
}

function generateUuid() {
    return Math.random().toString() + Math.random().toString() + Math.random().toString();
}
