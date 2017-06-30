let bcrypt = require('./../middleware/bcrypt');
let pino = require('pino')();
let db;

exports.init = (cursor) => {
    try {
        db = cursor;
    //    db.none('CREATE TABLE IF NOT EXISTS  ty(name VARCHAR(50), email VARCHAR(60), passwd VARCHAR(60))');

        db.none('CREATE TABLE IF NOT EXISTS  payment(waybill VARCHAR(50), qrcode BYTEA)');
    } catch (err) {
        pino.error("error in users model", err.message);
    }
}

exports.createUser = async(name, email, passwd) => {
    let hash = await bcrypt.getHash(passwd);
//await db.query('CREATE UNIQUE INDEX Q ON TY ("email")');
    return db.query('INSERT INTO users(name, email, passwd) VALUES($1, $2, $3) RETURNING email', [name, email, hash]);
}

exports.getUsers = async() => {
    return db.query('select name, email from users');
}

exports.getUserById = async(email) => {
    return db.query('select * from users where email = ${email}', {email: email});
}
