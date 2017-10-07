require('should');
const WitClient = require('../../dist/server/witClient');

describe('The WIT client', () => {
    describe('ask', () => {
        it('should return a valid wit response', (done) => {

            const witToken = process.env.WIT_API_KEY;  
            const witClient = new WitClient(witToken);

            witClient.ask('What is the current time in Vienna?', (err, response) => {
                if(err) return done(err);

                response.intent[0].value.should.equal('time');
                response.location[0].value.should.equal('Vienna');

                return done();
            });
        }).timeout(3000);;
    });
});