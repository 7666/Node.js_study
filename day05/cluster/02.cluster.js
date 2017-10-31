
var cluster = require('cluster');
var os = require('os');
var http = require('http');

if (cluster.isMaster){
  console.log("主进程代码运行空间");

  for (var i = 0, n = os.cpus().length; i < n; i++) {

    //newWorker就是创建的子进程
    var newWorker = cluster.fork();

    //newWorker.process就是包含了创建的子进程本身的信息
    console.log('新创建的进程的pid = ', newWorker.process.pid);
  }

} else {
  console.log("子进程代码运行空间");

  // setInterval(function(){
  //   console.log(`子进程 ${process.pid}`);
  // }, 2000);

  http.createServer(function(req, res){
    console.log(`子进程 ${process.pid} 接收了http请求 `);
    res.writeHead(200);
    res.end();
  }).listen(8000, function(){
    console.log(`子进程  ${process.pid}  监听 8000.。。`);
  });
}
