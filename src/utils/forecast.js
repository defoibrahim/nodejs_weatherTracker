const request = require('request')


const forecast = (lat,lon, callback) => {
   
    const url = 'http://api.openweathermap.org/data/2.5/weather?units=Kelvin&lat='+lat+'&lon='+lon+'&appid=43b0040323490be21cd52ce2d51464aa'

    request({url:url,json:true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
          
            
             callback(undefined, response.body.weather[0].description + ', It is currently ' + (response.body.main.temp - 273.15) + ' degree out. the high today is ' + (response.body.main.temp_max - 273.15) + " with low of  " + (response.body.main.temp_max - 273.15) + '. And the speed of wind is ' + response.body.wind.speed)
        }
    })
}

module.exports = forecast