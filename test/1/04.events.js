var EventEmitter = require('events');
var current = new EventEmitter();
var kai = new EventEmitter();
current.on('test',function(){
  console.log(1111);
})
current.on('test1',function(){
  console.log(222);
})
function like(){
  console.log(333);
}
kai.on('ro',like);

current.emit('test1');
current.emit('test');
kai.emit('ro');
kai.removeListener('ro',like);
var ls = kai.listeners('ro');
console.log(ls);
current.removeAllListeners('test1');
var lss = current.listeners('test');
console.log(lss);
current.removeAllListeners();
console.log(current.listeners('test'));
