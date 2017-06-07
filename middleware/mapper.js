'use strict';
let fs = require('fs');

module.exports = (pubRouter, securedRouter) => {
    fs.readdirSync(__dirname + '/../controllers').forEach(function(file) {
        if (!file.endsWith('.js'))
            return;
        let controller = require('./../controllers/' + file);
        if (controller.initPub)
            controller.initPub(pubRouter);
        if (controller.initSecured)
            controller.initSecured(securedRouter);
        }
    );
}
