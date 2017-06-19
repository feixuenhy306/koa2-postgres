'use-strict';

let amqp = require('amqplib');

async function rabbitTask() {
    try {
        let conn = await amqp.connect('amqp://localhost');
        let ch = await conn.createChannel();
        var q = 'rpc_queue';

        await ch.assertQueue(q, {durable: false});
        await ch.prefetch(1);

        console.log(' [x] Awaiting RPC requests');
        ch.consume(q, function reply(msg) {
            var n = msg.content.toString();

            var len = n.length;
            for (var i = len - 1; i >= 0; i--) {
                if (n[i] === ' ' && (n[i] < '0' || n[i] > '9'))
                    break;
                }

            var str = n.substring(i, len);
            var n = parseInt(str)
                ? n.substring(0, i + 1) + (parseInt(str) + 1)
                : n + " " + 1;

            let replyTo = msg.properties.replyTo;
            let correlatId = msg.properties.correlationId;

            ch.sendToQueue(replyTo, new Buffer(n), {correlationId: correlatId});

            ch.ack(msg);
        });
    } catch (e) {
        console.log("error in rabbitTask", e);
    }
}

rabbitTask();
