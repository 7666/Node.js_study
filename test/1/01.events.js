var EventEmitter = require('events');

var current = new EventEmitter();

current.on('test',function(){
  console.log('hello world');
})

setInterval(function(){
  current.emit('test')
},1000)
