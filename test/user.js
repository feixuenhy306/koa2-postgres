'use-strict'
let assert = require('assert'),
    request = require('supertest');

request = request('http://localhost:3000/v1');
it('user sign up', function(done) {
    request.post('/signup').send({email: 'a@a.com', passwd: '123'}).expect(res => {
        assert.equal(res.body[0].email, "a@a.com")
    }).expect(200, done);
});

it('user sign in', function(done) {
    request.post('/signin').send({email: 'a@a.com', passwd: '123'}).expect(200, done);
});
