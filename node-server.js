const express = require('express');
const app = express();

const server=app.listen(3355,()=>{
    console.log("Server started on http://localhost:3355");
});

// 0~65535 => 0~1023 사용중 => 1024 => port 허용
app.all('*', function(req, res, next)
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});



var client_id = 'IRScYBQb8ASjUyJLoJ6d';
var client_secret = 'VpRv68YgyE';
app.get('/news/datafind', function (req, res) {
    var api_url = 'https://openapi.naver.com/v1/search/news.json?display=100&query=' + encodeURI(req.query.query);
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});




