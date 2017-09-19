const Koa = require('koa');
let router = require('koa-router'),
    cors = require('koa2-cors'),
    bodyParser = require('koa-bodyparser'),
    logger = require('koa-pino-logger'),
    mapper = require('./mapper'),
    jwt = require('koa-jwt'),
    config = require('./../config'),
    fs = require('fs');

let publicKey = fs.readFileSync(config.app.publicKey);
let port = process.env.PORT || config.app.port;

const app = new Koa();

let pubRouter = new router();
let securedRouter = new router();
mapper(pubRouter, securedRouter);

app.use(cors(config.app.cors))
    .use(logger(config.app.log))
    .use(async(ctx, next) => {
        ctx.req.connection.setNoDelay(true); // disable nagle algorithm
        ctx.req.connection.setTimeout(0);
        await next();
    }).use(bodyParser()).use(pubRouter.routes()).use(pubRouter.allowedMethods())
    .use(jwt({secret: publicKey, algorithms: ['RS256']}))
    .use(async(ctx,next)=>{
        console.log('\n\n\n\n\n',ctx.state.user);
        await next();
    })
    .use(securedRouter.routes()).use(securedRouter.allowedMethods())
    .use(async(ctx, next) => {
        ctx.body = 'Invalid URL!!!';
    });

//app.listen(port, () => console.log(`Server listening on port: ${port}`));
exports.app = app;
