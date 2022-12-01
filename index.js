const express = require('express');
const weather = require('weather-js');
const puppeteer = require("puppeteer");
var exports = module.exports = {};

const app = express();
const port = 3000;

app.use(express.json())

let userList = [];
let Test = "";

const uObject = {
    name: "John",  // 사용자 실명
    studentID: "2020202020",   // 학번
    email: "example@example.com",  // 이메일
    phoneNumber: "012-3456-7890",   // 핸드폰 번호
    schoolEmail: "School@example.com",   // 학교 이메일
    password: "password", // 이 사이트에서 사용할 비밀번호
    everytimeID: "everytimeID", // 구글 연동을 위한 아이디
    everytimePW: "everytimePW", // 구글 연동을 위한 비밀번호
    location: "seoul, South Korea",
    schedules: [],
}

const loginUser = {  // 로그인한 유저의 정보를 저장함
    Username: "",
    UserSchoolID: "",
    UserEmail: "",
    UserphoneNumber: "",
    UserSchoolEmail: "",
    UserPassword: "",
    UserEID: "",
    UserEPW: "",
    Userlocation: "",
    UserSchedules: [],
}

userList.push(uObject);

console.log(userList[0].name);
console.log(userList.length);

exports.getID = function () {
    return loginUser.UserEID;
};

exports.getPW = function () {
    return loginUser.UserEPW;
};

// export { getID, getPW }

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

app.get('/loginUserLocation', (req, res) => {
    console.log("loginUser 위치 : ", loginUser.Userlocation)
    res.send(loginUser.Userlocation);
})

app.get('/loadSchdules', (req, res) => {
    console.log(loginUser.UserSchedules);
    res.send(JSON.stringify(loginUser.UserSchedules));
})

app.post('/saveSchedules', (req, res) => {
    //console.log(req.body);

    for (let i = 0; i < userList.length; i++) {
        if (userList[i].everytimeID == loginUser.UserEID) {
            userList[i].schedules = req.body;
            console.log(userList[i].everytimeID, userList[i].schedules);
        }
    }

    for (let v in Object.keys(loginUser)) {
        if (v === "UserSchedules") loginUser[v] = [];
        loginUser[v] = "";
    }

    res.send("완료!");

})

app.post('/weather', (req, res) => {

    let where = req.body.where;

    console.log("위치 : ", where);

    weather.find({ search: where, degreeType: 'C' }, function (err, result) {
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

app.get('/userList', (req, res) => {
    console.log("Getfunction starts.")
    res.send(userList);
});

app.post('/userList', (req, res) => {
    // console.log("Hello");
    // console.log(req.body);
    userList.push(req.body);
    console.log(userList.length);
    res.send(301);
});

app.post('/loginUser', (req, res) => {

    loginUser.Username = req.body.name
    loginUser.UserSchoolID = req.body.studentID
    loginUser.UserEmail = req.body.email
    loginUser.UserphoneNumber = req.body.phoneNumber
    loginUser.UserSchoolEmail = req.body.schoolEmail
    loginUser.UserPassword = req.body.password
    loginUser.UserEID = req.body.everyID
    loginUser.UserEPW = req.body.everyPW
    loginUser.Userlocation = req.body.location

    for (let i = 0; i < userList.length; i++) {
        if (userList[i].everytimeID == loginUser.UserEID) {
            loginUser.UserSchedules = userList[i].schedules;
            console.log(loginUser.UserSchedules);
        }
    }

    console.log(req.body);
    console.log(loginUser);
    res.send(301);
});

app.post('/Test', (req, res) => {
    console.log(req.body);
    res.send(200);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

