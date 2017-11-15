var http = require('http');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');


var app = express();


var server = http.createServer(app);
app.use(cookieParser());
app.use(express.static('public'));
app.use(session({
  secret:'hello',
  cookie:{}
}));
var options = {
  root:__dirname +'/html'
}

app.get('/',function(req, res){
  console.log(req.session.id);
  res.status(200);
  res.sendFile('/index.html',options);
})

server.listen(7666,function(){
  console.log('listen 7666 ...');
});
