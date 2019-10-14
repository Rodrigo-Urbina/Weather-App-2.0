const credentials = require('./credentials.js')
const request = require('request')

const climate = function (latitude, longitude, callback) {
    const url = 'https://api.darksky.net/forecast/' +   
        credentials.DARK_SKY_SECRET_KEY + `/${latitude},${longitude}?units=si&lang=es`
    request({ url: url, json: true }, function (error, response) {
        if (error) {
            callback(error, undefined)
        } else {
            const data = response.body.currently

            if (data.response == 'false') {
                callback(data.error, undefined)
            } else {
                const info = {
                    day: data.summary,
                    temp: data.temperature,
                    rain: data.precipProbability,
                    time: data.time
                }

                const news = `${info.day}. Actualmente está a ${info.temp}°C. Hay ${info.rain}% de probabilidad de lluvia.`
                callback(undefined, news)
                time(data.time)
            }
        }
    })
}

const city = function (name, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places' + `/${name}.json` + '?access_token=' +
        credentials.MAPBOX_TOKEN
    request({ url: url, json: true }, function (error, response) {
        if (error) {
            console.log('Error: ' + error.error)
        } else {
            const data = response.body

            if (data.features === undefined || data.features.length == 0) {
                console.log('Error: ' + data.message)
            } else {
                const info = {
                    coordinates: data.features[0].center,
                    city: data.place_name
                }

                callback(info)
        }
        const data = response.body.features[0]
        callback(error, data.place_name)
    })
}

const time = function (numTime) {
    console.log(new Date(numTime * 1000).toUTCString())
}

module.exports = {
    climate: climate,
    city: city,
    time: time
}