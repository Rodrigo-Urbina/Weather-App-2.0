/*'use strict';
var http = require('http');
var port = process.env.PORT || 1337;*/

const weather = require('./weather.js')

const cityName = 'Berlin'

weather.city(cityName, function (error, data) {
    if (error) {
        console.log(error)
    } else {
        console.log(data.place_name)
        if (data.center[1] && data.center[0]) {
            weather.climate(data.center[1], data.center[0], function (error, data) {
                console.log(data)
            })
        } else {
            console.log(data)
        }
    }
})

/*http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);*/
