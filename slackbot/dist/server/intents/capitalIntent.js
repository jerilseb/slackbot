'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, registry, cb) {

    if (intentData.intent[0].value !== 'capital') return cb(new Error(`Expected capital intent, got ${intentData.intent[0].value}`));

    if (!intentData.location) return cb(new Error('Missing location in capital intent'));

    const location = intentData.location[0].value.replace(/,.?iris/i, '');

    const service = registry.get('capital');
    if (!service) return cb(false, 'No service available');

    request.get(`http://${service.ip}:${service.port}/service/${location}`, (err, res) => {
        if (err || res.statusCode != 200 || !res.body.result) {
            console.log(err);
            return cb(false, `I had a problem finding out the capital of ${location}`);
        }

        return cb(false, `In ${location}, the capital is ${res.body.result}`);
    });
};