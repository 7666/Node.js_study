var http = require('http');
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var app = express();


//中间件:设置静态文件夹目录
app.use('/static',express.static(path.join(__dirname,'public')));

////为了解析 form 表单提交的  application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//为了解析 Http  body中的  json 数据
app.use(bodyParser.json());



app.listen(9996,function(){
  console.log('监听 9996....');
})


//链接数据库
var db = mongoose.connection;

db.on('error',function(err){
  console.log(err);
})

db.on('open',function(){
  console.log('数据库链接成功');
})

mongoose.connect("mongodb://kai:6014@127.0.0.1/USER?authSource=admin", {useMongoClient: true});


//创建数据库模板
var Schema = mongoose.Schema;

var admin = new Schema({user:String,pw:String});

var Adminmodel = mongoose.model('User',admin,'users');



var Student = mongoose.Schema;

var student = new Student({姓名:String,性别:String,年龄:Number,成绩:Number});

var Studentmodel = mongoose.model('Student',student,'class1');

//加载登录页面
app.get('/',function(req,res){
  var options = {
    root: __dirname + '/public/'
  }
  res.type('text/html');
  res.status(200);
  res.sendFile("/html/login.html",options,function(err){
  });
});


//提交登录信息
app.post('/login',function(req,res){
  console.log(req.body.user);
  Adminmodel.find({'user':'kai'},function(err,data){
    console.log(data);
    if(data[0]){
      console.log(11);
    if(data[0].pw == req.body.pw ){
      console.log(22);
      res.status(200);
      res.type("application/json");
      res.json({static:1});
    }else{
      console.log(33);
      res.status(200);
      res.type("application/json");
      res.json({static:0});
    }}else{
      console.log(44);
      res.status(200);
      res.type("application/json");
      res.json({static:0});
    }
  });
})

//管理页面
app.get('/manage',function(req,res){
  res.type('text/html');
  res.status(200);
  res.sendFile(__dirname + '/public/html/manage.html');
})

//查询数据库所有学生数据
app.get('/search',function(req, res){
  Studentmodel.find(req.query,function(err,data){
    res.status(200);
    res.type("application/json");
    res.json(data);
  })
})

//添加学生数据
app.post('/add',function(req, res){
  Studentmodel.create(req.body,function(err, data){
    res.status(200);
    res.type("application/json");
    res.json({status:1});
  })
});

//删除学生数据
app.delete('/remove',function(req, res){
  console.log(req.body);
  Studentmodel.remove(req.body,function(err, data){
    res.status(200);
    res.type("application/json");
    res.json({status:1});
  })
})

//修改学生数据
app.put('/midifi',function(req, res){
  var before = JSON.parse(req.body['before']);
  var nowdata = JSON.parse(req.body['nowdata']);

  Studentmodel.update(before,nowdata,function(err, data){
    res.status(200);
    res.type("application/json");
    res.json({status:1});
  })
})



//无法匹配其他路由时,就会匹配该路由
app.use(function(req, res){
  res.status(404);
  res.type("text/html");
  res.send("<h1>not found!</h1>");
});
