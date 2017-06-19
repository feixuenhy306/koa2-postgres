'use strict';
let bcrypt = require('bcrypt-nodejs');
let pino = require('pino')();

exports.getHash = async(pwd) => {
    try {
        let salt = await new Promise((res, rej) => {
            bcrypt.genSalt(undefined, function(err, result) {
                if (err)
                    rej(err);

                res(result);
            });
        });

        let hash = await new Promise((res, rej) => {
            bcrypt.hash(pwd, salt, null, function(err, hash) {
                if (err)
                    rej(err);

                res(hash)
            });
        });

        return hash;
    } catch (err) {
        pino.info("error in bcrypt.js file ", err);
    }
}

exports.comparePassword = async(pwd, hash) => {
    return await new Promise((res, rej) => {
        bcrypt.compare(pwd, hash, function(err, resp) {
            if (err)
                rej(err);
            res(resp);
        });
    });
}
