var https = require('https');
var fs = require('fs');


var secrets;

fs.readFile(__dirname+'/../secrets.json',function(error,data){
  if(error){
    return console.error(error);
  }
  secrets = JSON.parse(data);
});

var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/*', function(req, res, next){
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next();
});

app.get('/', function(req, res){
  var path = __dirname+"/index.html";
  res.sendFile(path);
});

app.get('/api/search/', function(req,res){
  var query = encodeURIComponent(req.query.searchTerm);
  var req = https.request(
    {
      hostname: secrets.cardAPI.url,
      path: '/cards/search/'+query,
      method: 'GET',
      headers: {'X-Mashape-Key':secrets.cardAPI.key}
    },
    function(res){
      var allData = '';
      res.on('data', function(data) {
        allData += data;
      });
      res.on('end', function(){
        console.log(JSON.parse(allData));
      });
    }
  );

  req.end();

  req.on('error', function(error){
    console.error(error);
  });
});

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
  console.log(__dirname);
});
