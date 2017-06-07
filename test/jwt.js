'use strict';
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE0MjY1NDY5MTl9.ETgkTn8BaxIX4YqvUWVFPmum3moNZ7oARZtSBXb_vP4';

const Koa = require('koa');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const koajwt = require('koa-jwt');
const fs = require('fs');

it('not work if no authorization header', done => {
    const validUserResponse = res => res.body.foo !== 'bar' && "Wrong user";

    const isRevoked = (token, ctx, user) => Promise.resolve(false);

    const secret = 'shhhhhh';
    let cert = fs.readFileSync(__dirname + '/../keys/priv.pem')
    const token = jwt.sign({
        foo: 'bar'
    }, cert, {algorithm: 'RS256'});

    const app = new Koa();
    let publicKey = fs.readFileSync(__dirname + '/../keys/pub.pem');
    app.use(koajwt({secret: publicKey, algorithms: ['RS256']}));
    app.use(ctx => {
        ctx.body = ctx.state.user;
    });

    request(app.listen()).get('/').expect(401).expect(validUserResponse).end(done);
});

it('not work if authorization header has no jwt', done => {
    const validUserResponse = res => res.body.foo !== 'bar' && "Wrong user";

    const isRevoked = (token, ctx, user) => Promise.resolve(false);

    const secret = 'shhhhhh';
    let cert = fs.readFileSync(__dirname + '/../keys/priv.pem')
    const token = jwt.sign({
        foo: 'bar'
    }, cert, {algorithm: 'RS256'});

    const app = new Koa();
    let publicKey = fs.readFileSync(__dirname + '/../keys/pub.pem');
    app.use(koajwt({secret: publicKey, algorithms: ['RS256']}));
    app.use(ctx => {
        ctx.body = ctx.state.user;
    });

    request(app.listen()).get('/').set('Authorization', 'Beare ').expect(401).expect(validUserResponse).end(done);
});


it('not work if authorization header is valid jwt', done => {
    const validUserResponse = res => res.body.foo !== 'bar' && "Wrong user";

    const isRevoked = (token, ctx, user) => Promise.resolve(false);

    const secret = 'shhhhhh';
    let cert = fs.readFileSync(__dirname + '/../keys/priv.pem')
    const token = jwt.sign({
        foo: 'bar'
    }, cert, {algorithm: 'RS256'});

    const app = new Koa();
    let publicKey = fs.readFileSync(__dirname + '/../keys/pub.pem');
    app.use(koajwt({secret: publicKey, algorithms: ['RS256']}));
    app.use(ctx => {
        ctx.body = ctx.state.user;
    });

    request(app.listen()).get('/').set('Authorization', 'Beare ' + token +233).expect(401).expect(validUserResponse).end(done);
});

it('should work if authorization header is valid jwt', done => {
    const validUserResponse = res => res.body.foo !== 'bar' && "Wrong user";

    const isRevoked = (token, ctx, user) => Promise.resolve(false);

    const secret = 'shhhhhh';
    let cert = fs.readFileSync(__dirname + '/../keys/priv.pem')
    const token = jwt.sign({
        foo: 'bar'
    }, cert, {algorithm: 'RS256'});

    const app = new Koa();
    let publicKey = fs.readFileSync(__dirname + '/../keys/pub.pem');
    app.use(koajwt({secret: publicKey, algorithms: ['RS256']}));
    app.use(ctx => {
        ctx.body = ctx.state.user;
    });

    request(app.listen()).get('/').set('Authorization', 'Bearer ' + token).expect(200).expect(validUserResponse).end(done);
});
