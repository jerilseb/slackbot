const slackClient = require('../server/slackClient');
const http = require('http');
const config = require('../../config');
const service = require('../server/service')(config);
const server = http.createServer(service);
const witClient = require('../server/witClient')(config.witToken);

const serviceRegistry = service.get('serviceRegistry');
const rtm = slackClient.init(config.slackToken, config.slackLogLevel, witClient, serviceRegistry);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', () => {
    console.log(`App is listening on ${server.address().port} in ${service.get('env')} mode.`);
});
