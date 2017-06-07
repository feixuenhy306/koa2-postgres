'use strict';
let fs = require('fs')
let pgp = require('pg-promise')();
let config = require('./../config');
let db = pgp(config.postgres);

fs.readdirSync(__dirname + '/').forEach(function(file) {
    if (file != 'index.js') {
        let model = require('./' + file);
        model.init(db);
    }
});

console.log("Postgres DB connected!!");

module.exports = db;
