var chai = require('chai'),
    chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

it('user sign up', function() {
    chai.request('localhost:3000').post('/v1/signup').send({email: 'a@a.com', passwd: '123'}).end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(req).to.have.header('Authorization', /^Bearer */);
    });
});

it('user sign in', function() {
    chai.request('localhost:3000').post('/v1/signin').send({email: 'a@a.com', passwd: '123'}).end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
    });

});
