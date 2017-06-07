'use strict';
let db = require('./../model/user'),
    jsonwebtoken = require('jsonwebtoken'),
    bcrypt = require('./../middleware/bcrypt'),
    redis = require('./../utils/redis'),
    config = require('./../config'),
    error = require('./../utils/error'),
    fs = require('fs');

exports.initPub = function(app) {
    app.post("/v1/signup", signUp);
    app.post("/v1/signin", signIn);
}

exports.initSecured = function(app) {
    app.get("/v1/users", getUsers);
}

/**
 * @swagger
 * /v1/signUp:
 *      post:
 *          description: SignUp to the application
 *          parameters:
 *              -name:
 *                  required: true
 *                  type: string
 *              -password:
 *                  required: true
 *                  type: string
 *              -email:
 *                  required: true
 *                  type: string
 *      produces:
 *          - application/json
 *      responses:
 *          200
 */
async function signUp(ctx, next) {
    try {
        let body = ctx.request.body;
        ctx.log.info("signup fields", body);

        let email = body.email;
        let name = body.name;
        let passwd = body.passwd;

        let data = await db.createUser(name, email, passwd);
        await redis.deleteKey('users');

        ctx.body = data;
        var cert = fs.readFileSync(config.app.privateKey)
        ctx.set('Authorization', " Bearer " + jsonwebtoken.sign({
            email: email
        }, cert, {algorithm: 'RS256'}));

        ctx.status = 200;

    } catch (err) {
        ctx.log.info(err);
        ctx.status = err.status || 500;
        ctx.body = error(ctx, err);
        ctx.app.emit('error', err, ctx)
    }
}

/**
 * @swagger
 * /v1/signin:
 *      post:
 *          description: Sign to the application
 *          parameters:
 *              -password:
 *                  required: true
 *                  type: string
 *              -email:
 *                  required: true
 *                  type: string
 *      produces:
 *          - application/json
 *      responses:
 *          200
 */
async function signIn(ctx, next) {
    try {
        let body = ctx.request.body;
        let email = body.email;
        let passwd = body.passwd;
        ctx.log.info("signin fields", body);

        let userInfo = await db.getUserById(email);

        if (userInfo.length) {
            let flag = await bcrypt.comparePassword(passwd, userInfo[0].passwd);

            ctx.log.info("sign in flag", flag);

            if (flag === true) {
                let cert = fs.readFileSync(config.app.privateKey)
                ctx.set('Authorization', " Bearer " + jsonwebtoken.sign({
                    email: email
                }, cert, {algorithm: 'RS256'}));

                ctx.status = 200;
            } else {
                ctx.status = 403;
            }

        } else {
            ctx.status = 401;
        }

    } catch (err) {
        ctx.log.info(err);
        ctx.status = err.status || 500;
        ctx.body = error(ctx, err);
        ctx.app.emit('error', err, ctx)
    }
}

/**
 * @swagger
 * /users:
 *   get:
 *     description: Returns users
 *     tags:
 *      - Users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 */

exports.getUsers = getUsers;
async function getUsers(ctx, next) {
    try {

        ctx.log.info("get users query", ctx.request, "\nn\n");
        let users = await redis.getString('users');

        if (!users) {
            users = [];
            let arr = await db.getUsers();
            users = JSON.stringify(arr);
            await redis.saveString('users', users);
        }

        ctx.body = JSON.parse(users);
        ctx.status = 200;

    } catch (err) {
        ctx.log.info(err);
        ctx.status = err.status || 500;
        ctx.body = error(ctx, err);
        ctx.app.emit('error', err, ctx)
    }
}

/**
 * @swagger
 * definitions:
 *   Sign:
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 */
