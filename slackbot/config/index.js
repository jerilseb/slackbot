require('dotenv').config();
const bunyan = require('bunyan');

const log = {
    development: () => {
        return bunyan.createLogger({name: 'slackbot-development', level: 'debug'});
    },
    production: () => {
        return bunyan.createLogger({name: 'slackbot-production', level: 'info'});
    },
    test: () => {
        return bunyan.createLogger({name: 'slackbot-test', level: 'fatal'});
    }
};

module.exports = {
    witToken: process.env.WIT_TOKEN,
    slackToken: process.env.SLACK_TOKEN,
    slackLogLevel: 'verbose',
    serviceTimeout: 30,
    log: (env) => {
        if(env) return log[env]();
        return log[process.env.NODE_ENV || 'development']();
    }
};