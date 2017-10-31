var http = require('http');

var sever = http.createServer(function(req,res){
  res.writeHead(200,{'Content-Type':'text/html'});
  res.write('<h1>hello world<h1>');
})

sever.listen(8080,function(){
  console.log('监听8080端口.....');
})
