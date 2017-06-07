'use strict'

let lodash = require('lodash');

let baseconfig = {
    app: {
        version: 1,
        env: process.env.NODE_ENV,
        cors: {
            maxAge: 84600,
            credentials: true,
            methods: 'GET, HEAD, OPTIONS, PUT, POST, DELETE',
            headers: 'Access-Control-Allow-Origin, Access-Control-Expose-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization'
        },
        email: "rishabh.chandel@cyberlinks.in",
        passwd: "*******"
    },
    redis: {
        host: 'localhost',
        port: 6379,
        option: {}
    }
};

let platformConfig = {
    dev: {
        app: {
            host: 'localhost',
            port: 3000,
            publicKey: __dirname + '/keys/pub.pem',
            privateKey:  __dirname + '/keys/priv.pem',
            uploadDir: __dirname + '/uploads/'
        },
        log: {
            name: 'delhivery',
            safe: true
        },
        postgres: {
            host: 'localhost',
            port: 5432,
            database: 'paytmuser',
            user: 'postgres',
            password: 'newpassword',
            max: 10,
            idleTimeoutMillis: 30000
        }
    },

    beta: {
        app: {
            host: 'localhost',
            port: 3000,
            publicKey: __dirname + '/keys/pub.pem',
            privateKey:  __dirname + '/keys/priv.pem',
            uploadDir: __dirname + '/uploads/'
        },
        log: {
            name: 'delhivery',
            safe: true
        },
        postgres: {
            host: 'localhost',
            port: 5432,
            database: 'paytmuser',
            user: 'postgres',
            password: 'newpassword',
            max: 10,
            idleTimeoutMillis: 30000
        }
    },

    prod: {
        app: {
            host: 'localhost',
            port: 3000,
            publicKey: __dirname + '/keys/pub.pem',
            privateKey:  __dirname + '/keys/priv.pem',
            uploadDir: __dirname + '/uploads/'
        },
        log: {
            name: 'delhivery',
            safe: true
        },
        postgres: {
            host: 'localhost',
            port: 5432,
            database: 'paytmuser',
            user: 'postgres',
            password: 'newpassword',
            max: 10,
            idleTimeoutMillis: 30000
        }
    }
};

module.exports = lodash.merge(baseconfig, platformConfig[baseconfig.app.env || 'dev']);
