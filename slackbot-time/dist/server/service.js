'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');

service.get('/service/:location', (() => {
    var _ref = _asyncToGenerator(function* (req, res, next) {

        try {
            let response = yield request.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.location}&key=AIzaSyB-pJjoqFtvVCuFUZtfUIAO0E9TV9QZTIU`);
            const location = response.body.results[0].geometry.location;
            const timestamp = +moment().format('X');

            response = yield request.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lng}&timestamp=${timestamp}&key=AIzaSyC8Dqmw7riwATGDfg0OZc78LdGS6icL9Ys`);
            const result = response.body;
            const timeString = moment.unix(timestamp + result.dstOffset + result.rawOffset).utc().format('dddd, MMMM Do YYYY, h:mm:ss a');
            res.json({ result: timeString });
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
})());

module.exports = service;