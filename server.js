var express = require('express');
const https = require("https");

var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/build'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/posts', function(req, res) {
  const url = "https://medium.com/@patrocc6/latest?format=json";

  https.get(url, response => {
    response.setEncoding("utf8");
    let body = "";

    response.on("data", data => {
      body += data;
    });

    response.on("end", () => {
      body = body.replace('])}while(1);</x>', '');
      res.setHeader('Content-Type', 'application/json');
      res.send(body);
    });

  });
  
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
