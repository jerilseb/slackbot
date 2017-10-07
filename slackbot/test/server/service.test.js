const should = require('should');
const request = require('supertest');
const service = require('../../src/server/service');


describe('The express service', () => {
    describe('PUT /foo', () => {
        it('should return HTTP 404', (done) => {
            request(service)
                .put('/foo')
                .expect(404, done);
        });
    });

    describe('PUT /service/:intent/:port', () => {
        it('should return HTTP 200', (done) => {
            request(service)
                .get('/service/test/9999')
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    res.body.result.should.startWith('test at');
                    return done();
                });
        });
    });
});

