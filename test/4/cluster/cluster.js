var cluster = require('cluster');
var os = require('os');
var http = require('http');

if(cluster.isMaster){
  for(var i = 0;i<os.cpus().length;i++){
    var worker = cluster.fork();
    console.log(`建立进程号为${worker.process.pid}的子进程`);

  }

  cluster.on('online',function(worker){
    console.log(`进程号为${worker.process.pid}的子进程在运行`);
  })
  cluster.on('exit',function(worker,code,signal){
    console.log(`进程号为${worker.process.pid}的子进程被${signal}杀死,状态码为${code}`);
    setTimeout(function(){
      var worker = cluster.fork();
    },2000);
  })
  worker.on('message',function(data){
    console.log(`主进程收到的${data}`);
  });
  setInterval(function(){
    for(var key in cluster.workers){
    cluster.workers[key].send('主进程发给子进程的消息');
  }
  },2000);


}else{

  http.createServer(function(req,res){
    console.log(cluster.workers);
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end();
  }).listen(9666,function(){
    console.log('监听 9666 端口');
  })

  setInterval(function(){
    process.send('子进程发给主进程的消息');
  },2000);

  process.on('message',function(data){
    console.log(`子进程${process.pid}收到的消息${data}`);
  })
}
