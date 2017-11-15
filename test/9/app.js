var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var server = http.createServer(app);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

var options = {
  root:__dirname + '/html'
}

app.get('/',function(req, res){
  console.log(req.cookies);
  res.status(200);
  // res.type('text/html');
  res.cookie('name','wangwu',{maxAge:6666666,path:'/'});
  // res.cookie("num", "100");
  // res.cookie("num1", "100");
  // res.cookie("num2", "100");
  res.sendFile('/index.html',options)
});

server.listen(7666,function(){
  console.log('listen 7666 ....');
});
