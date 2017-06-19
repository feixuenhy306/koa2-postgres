'use strict';
let db = require('./../model/user'),
    jsonwebtoken = require('jsonwebtoken'),
    bcrypt = require('./../middleware/bcrypt'),
    redis = require('./../utils/redis'),
    config = require('./../config'),
    error = require('./../utils/error'),
    fs = require('fs'),
    swaggerJSDoc = require('swagger-jsdoc');

exports.initPub = function(app) {
    app.get("/v1/apiDoc", apiDoc);
}

var swaggerDefinition = {
    info: {
        title: config.app.name,
        version: config.app.version,
        description: 'payment Gatway CRUD'
    },
    host: config.app.host,
    port: config.app.port,
    basePath: '/'
};

var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./controllers/*.js']
};

var swaggerSpec = swaggerJSDoc(options);

async function apiDoc(ctx, next) {
    let swaggerSpec = swaggerJSDoc(options);
    ctx.body = swaggerSpec;
    ctx.status = 200;
}
