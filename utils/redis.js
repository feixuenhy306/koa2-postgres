'use strict'

let redis = require('redis');
let pino = require('pino')();
let client;

exports.init = (config) => {
    new Promise((res, rej) => {
        client = redis.createClient(config.redis.port, config.redis.host);
        client.on('connect', function() {
            console.log('Connected to redis server!!');
            res(true);
        });
        client.on('error', function(err) {
            console.log('Error in redis server', err);
            rej(err);
        });
        client.on('end', function() {
            console.log('connection to redis server is closed!!');
        });
    });
};

exports.saveListObj = async(arr) => {
    client.rpush(arr, function(err, reply) {});
};

exports.getListObj = async(key) => {

    return new Promise((res, rej) => {
        client.lrange(key, 0, -1, function(err, obj) {
            if (err) {
                pino.info("error in getting users query on redis", err);
                rej(err);
            }
            pino.info("redis", obj)
            res(obj)
        });
    });
};

exports.saveString = async(key, str) => {
    client.set(key, str);
};
exports.getString = async(key) => {
    return new Promise((res, rej) => {
        client.get(key, function(err, reply) {
            if (err)
                rej(err);
            res(reply);
        });
    });
};

exports.deleteKey = (key) => {
    return new Promise((res, rej) => {
        client.del(key, function(err, reply) {
            if(err) rej(err);
            res(reply);
        });
    })
}
