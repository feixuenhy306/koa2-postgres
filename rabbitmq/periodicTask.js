'use strict';

let amqp = require('amqplib');
let pino = require('pino')();
let cron = require('node-cron');

let task;
exports.init = async function(db, ch) {

    task = cron.schedule('0-59 * * * *', function() {
        performtask(db, ch);
    }, true);

    task.start();
    console.log("task started!!");
}

async function performtask(db, ch) {
    try {
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
    } catch (e) {
        pino.error("error in performtask function");
        task.stop();
    }

}

function generateUuid() {
    return Math.random().toString() + Math.random().toString() + Math.random().toString();
}
