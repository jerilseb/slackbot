'use strict';

const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const TIMEZONE_API_KEY = process.env.TIMEZONE_API_KEY;

service.get('/service/:location', async (req, res, next) => {

    try{
        let response = await request.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.location}&key=${GEOCODE_API_KEY}`);
        const location = response.body.results[0].geometry.location;
        const timestamp = +moment().format('X');

        response = await request.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lng}&timestamp=${timestamp}&key=${TIMEZONE_API_KEY}`);
        const result = response.body;
        const timeString = moment.unix(timestamp + result.dstOffset + result.rawOffset).utc().format('dddd, MMMM Do YYYY, h:mm:ss a');
        res.json({result: timeString});

    } catch(err) {
        console.log(err);
        return res.sendStatus(500); 
    }
});

module.exports = service;