'use strict';

let cron = require('node-cron');
let amqp = require('amqplib');
let pino = require('pino')();

exports.init = async(db) => {
    try {
        let amqpConn = await amqp.connect('amqp://localhost?heartbeat=160');
        amqpConn.on("error", function(err) {
            if (err.message !== "Connection closing") {
                pino.error("[AMQP] conn error", err.message);
            }
        });

        amqpConn.on("close", function() {
            pino.error("[AMQP] reconnecting");
            rej(setTimeout(start, 1000));
        });

        let ch = await amqpConn.createChannel();

        let task = cron.schedule('0-59 * * * *', async function() {
            let data = await db.query('select name,email from users');

            for (let i = 0; i < data.length; i++) {
                if (!data[i].name)
                    continue;

                let q = await ch.assertQueue('', {exclusive: true});

                var corr = generateUuid();

                ch.consume(q.queue, function(msg) {
                    if (msg.properties.correlationId === corr) {
                        let str = msg.content.toString();
                        pino.info(' [.] Got %s', str);
                        db.query('update users  set name = $1 where email = $2', [str, data[i].email]);
                    }
                }, {noAck: true});

                ch.sendToQueue('rpc_queue', new Buffer(data[i].name), {
                    correlationId: corr,
                    replyTo: q.queue
                });
            }
            pino.info('running a task every minute');
        }, true);

        task.start();
        pino.info("task started!!");

    } catch (e) {
        pino.error(e);
    }
}

function generateUuid() {
    return Math.random().toString() + Math.random().toString() + Math.random().toString();
}
