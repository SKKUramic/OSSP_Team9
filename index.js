const express = require('express');
const weather = require('weather-js');

const app = express();
const port = 3000;

function getWeather(weather) {
    const weatherObject = {
        "location": "",
        "temperature": "",
        "skycode": "",        // 날씨 코드 
        "skytext": "",     // 날씨 상태
        "date": "",   // 날짜
        "feelslike": "",      // 체감온도
        "humidity": "",
        "shortday": "",
        "imageUrl": ""
    };

    const currentWeather = weather[0].current;
    weatherObject.location = weather[0].location.name.split(',')[0];    // 지역(시)
    weatherObject.temperature = currentWeather.temperature;
    weatherObject.skycode = currentWeather.skycode;
    weatherObject.skytext = currentWeather.skytext;
    weatherObject.date = currentWeather.date;
    weatherObject.feelslike = currentWeather.feelslike;
    weatherObject.humidity = currentWeather.humidity;
    weatherObject.shortday = currentWeather.shortday;
    weatherObject.imageUrl = currentWeather.imageUrl;

    return weatherObject;

    // 필요한거 : location, date, °C, shortday
}

app.use(express.static('public'));

app.post('/weather', (req, res) => {

    console.log(req.body);

    //let where = req.body.where;

    weather.find({ search: "Busan, South Korea", degreeType: 'C' }, function (err, result) {
        if (err) console.log(err);

        //console.log(JSON.stringify(result, null, 2));

        const weatherRes = result;

        const weatherObject = getWeather(weatherRes);

        // for (const key in weatherObject) {
        //     let element = weatherObject[key];
        //     console.log(key, ":", element);
        // }

        res.send(JSON.stringify(weatherObject));

    });

    //res.send();

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
