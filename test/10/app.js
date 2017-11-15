var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var redis = require('redis');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var redis = require('redis');

//创建redis客户端
var client = redis.createClient({host:'127.0.0.1',password:'123'});

client.on('connect',function(){
    console.log('redis数据库链接成功');
})
client.on('end',function(){
  console.log('redis数据库链接中断');
})

var app = express();
var options = {
  root:__dirname + '/html'
};


//数据库链接
var db = mongoose.connection;
db.on('open',function(){
  console.log('数据库链接成功');
});

mongoose.connect('mongodb://kai:6014@127.0.0.1/USER?authSource=admin',{useMongoClient:true});
//创建数据库模板
var User = mongoose.Schema;
var userSchema = new User({user:String,pw:String});
var userModel = mongoose.model('User',userSchema,'users');

var user;


//中间件
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
  secret: 'hello',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 600000000,
    path: "/",
    httpOnly: true
  }
}));


http.createServer(app).listen(7666,function(){
  console.log('listen 7666....');
});

app.get('/',function(req, res){
  client.hget('sessionID',user,function(err,reply){
    if(err){
      res.redirect('/login');
    }else{
      if(reply == req.sessionID){
        res.redirect('/index');
      }else{
        res.redirect('/login');
      }
    }

  });
});


app.get('/index',function(req, res){
  client.hget('sessionID',user,function(err,reply){
    if(err){
      res.redirect('/login');
    }else{
      if(reply == req.sessionID){
        res.status(200);
        res.type('text/html');
        res.sendFile('/index.html',options);
      }else{
        res.redirect('/login');
      }
    }

  });
});

app.delete('/index',function(req, res){
  client.hdel('sessionID',user,function(err,reply){
    if(!err){
      res.json({status:1});
    }
  })
});

app.get('/login',function(req, res){
  client.hget('sessionID',user,function(err,reply){
    if(err){
      res.status(200);
      res.type('text/html');
      res.sendFile('login.html',options);
    }else{
      if(reply == req.sessionID){
        res.redirect('/index');
      }else{
        res.status(200);
        res.type('text/html');
        res.sendFile('login.html',options);
      }
    }

  });
});

app.post('/login',function(req, res){
  user = req.body.user;
  userModel.find({'user':req.body.user,'pw':req.body.pw},function(err,data){
    if(data[0]){
      client.hmset('sessionID',user,req.sessionID,function(err,reply){
      });
      res.cookie('user',user);
      res.json({status:1});
    }else{
      res.json({status:0});
    }
  })
});
