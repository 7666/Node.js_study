process.on('exit',function(){
  console.log('exit');
})

console.log(`process.pid  ${process.pid}`);

process.on('beforeExit',function(){
    console.log('beforeExit');
  })
  var i = 0;
  var id = setInterval(function(){
    i++;
    if(i==5){
    // process.kill(process.pid,'SIGKILL');
    process.exit(0);
    }
    console.log(i);
  },1000);
