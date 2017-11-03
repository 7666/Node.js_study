var http = require('http');
var socket = require('socket.io');
var url = require('url');
var fs = require('fs');

var server = http.createServer(handler);
var io = socket(server);
var count = 0;

function handler(req,res){
  var myURL = url.parse(req.url);
  if(myURL.pathname === '/'){
    fs.readFile('./index.html',function(err, data){
      if(!err){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
      }else{
        res.writeHead(500)
        res.end();
      }

    })

  }else if(myURL.pathname === '/socket.io.js'){
    fs.readFile('./socket.io.js',function(err, data){
      if(!err){
        res.writeHead(200,{'Content-Type':'text/js'});
        res.end(data);
      }else{
        res.writeHead(500)
        res.end();
      }})
  }else{
    res.writeHead(404);
    res.end();
  }
};

server.listen(7666,function(){
  console.log('listen 7666 ...');
});

io.on('connection',function(socket){
  var userName;
  count++;


  socket.on('userName',function(data){
    userName = data;
    socket.broadcast.emit('user connect', `${data} 进入了房间`);
    io.sockets.emit('count',`当前在线人数${count}人`);
  })



  socket.on('say',function(data){
    io.sockets.emit('saycontent',data);
  })

  socket.on('disconnect', function(){
    socket.broadcast.emit('user disconnect', `${userName} 退出了房间`);
    count--;
    io.sockets.emit('count',`当前在线人数${count}人`);
  });

})
