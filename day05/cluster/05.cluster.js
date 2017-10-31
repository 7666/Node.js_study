var os = require('os');
var cluster = require('cluster');

if (cluster.isMaster){
  var worker = cluster.fork();

  //主进程给子进程发送消息
  worker.send("主进程给子进程发送了消息");

  //主进程接收子进程发来的消息
  worker.on('message', function(mesg){
    console.log("父进程接收消息", mesg);
  });

} else {

  //子进程接收父进程发来的消息
  process.on('message', function(mesg){
    console.log("子进程收消息：", mesg);
  });

  setInterval(() => {

  //子进程给父进程发消息
    process.send("子进程发给主进程的消息");
  }, 2000);
}
