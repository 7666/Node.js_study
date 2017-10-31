/*同步异步测试*/

function one(){
  console.log(111);
};

one();

process.stdout.write('helloworld');



for(var i = 1;i<1000;i++){
  console.log(i);
}

setImmediate(function(){
  console.log(888);
})

setTimeout(function(){
  console.log(9999);
},0)

process.nextTick(function(){
  console.log(2222);
})
