var mongo = require('mongoose');

var url = "mongodb://hehe:123@192.168.0.7/方堃欧巴?authSource=admin";

var db = mongo.connection;

db.on('error',function(error){
    console.log(error);
})

db.on('open',function(){
  console.log('success');
})

mongo.connect(url,{useMongoClient:true});


var Schema = mongo.Schema;

var stuSchema = new Schema({name:String,age:Number,gender: Number});

var StuOne = mongo.model('One',stuSchema);

new StuOne({name:'方堃欧巴',age:20,gender:1}).save(function(err, data){
  console.log(err);
  console.log(data);

  mongo.disconnect();
})

// StuOne.update({name:'wangkai'},{$unset:{name:1,age:1,man:1}},{mulit:true},function(){
//   console.log(arguments);
//   db.close();
// })
