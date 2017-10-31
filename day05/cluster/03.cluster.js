
var os = require('os');
var cluster = require('cluster');


if (cluster.isMaster){
  for (var i = 0, n = os.cpus().length; i < n ; i++) {
    var worker = cluster.fork();
    console.log(`${worker.process.pid} 进程创建`);
  }

  //子进程开始正常运行之后， 触发 cluster上的online事件
  cluster.on('online',  (worker)=>{
    console.log(`${worker.process.pid} 已经开始正常运行`);
  });

  //子进程结束时，触发 exit
  //worker, 结束的进程对象
  // code ， 结束的状态码
  // signal, 如果由于信号的作用导致结束，那么会是一个数字表示某种信号
  cluster.on('exit', (worker, code, signal)=>{
    console.log(`${worker.process.pid} 被 ${signal} 给杀死, 结束状态码为 ${code}`);
    console.log("10s之后重启一个。。。。。");

    setTimeout(()=>{
      var worker = cluster.fork();
      console.log(`重新产生一个 ${worker.process.pid}`);
    }, 10000)
  });


} else {
  setInterval(() => {
    console.log(`${process.pid} 进程输出`);
  }, 2000);
}
