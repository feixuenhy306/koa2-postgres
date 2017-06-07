'use strict';

let cron = require('node-cron');
let amqp = require('amqplib/callback_api');
let amqpConn = null;

exports.init = async(db) => {
    try {
        let i = 0;
        let task = cron.schedule('0-59 * * * *', async function() {
            let data = await db.query('select name,email from users');

            for (let i = 0; i < data.length; i++) {
                if (!data[i].name)
                    continue;

                amqpConn.createChannel(function(err, ch) {
                    ch.assertQueue('', {
                        exclusive: true
                    }, function(err, q) {
                        var corr = generateUuid();

                        ch.consume(q.queue, function(msg) {
                            if (msg.properties.correlationId === corr) {
                                let str = msg.content.toString();
                                console.log(' [.] Got %s', str);
                                db.query('update users  set name = $1 where email = $2', [str, data[i].email]);
                            }
                        }, {noAck: true});

                        ch.sendToQueue('rpc_queue', new Buffer(data[i].name), {
                            correlationId: corr,
                            replyTo: q.queue
                        });

                    });
                });

            }
            console.log('running a task every minute');
        }, true);

        await start(task);
        console.log("task started!!");

    } catch (e) {}
}

function generateUuid() {
    return Math.random().toString() + Math.random().toString() + Math.random().toString();
}

function start(task) {
    return new Promise((res, rej) => {
        amqp.connect('amqp://localhost', function(err, conn) {
            if (err) {
                console.error("[AMQP]", err.message);
                rej(setTimeout(start, 1000));
            }
            conn.on("error", function(err) {
                if (err.message !== "Connection closing") {
                    console.error("[AMQP] conn error", err.message);
                }
            });
            conn.on("close", function() {
                console.error("[AMQP] reconnecting");
                rej(setTimeout(start, 1000));
            });
            task.start();
            console.log("[AMQP] connected");
            amqpConn = conn;
            res(conn);
        });
    });
}
