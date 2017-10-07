'use strict';

const request = require('superagent');
const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);
server.listen();

server.on('listening', function () {
    console.log(`Slackbot-Time is listening on ${server.address().port} in ${service.get('env')} mode.`);

    const announce = () => {
        request.get(`http://127.0.0.1:3000/service/time/${server.address().port}`, (err, res) => {
            if (err) console.log("Error connecting to Slackbot");
        });
    };

    announce();
    setInterval(announce, 5 * 1000);
});