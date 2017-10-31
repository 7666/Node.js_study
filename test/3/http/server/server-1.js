var http = require('http');
var fs = require('fs');
var url = require('url');


http.createServer(function(req, res){
  var pathname = req.url;
  var filetype,filedir,filename,coding;
  var ContentType = {
    'css':'text/css',
    'js':'text/js',
    'jpg':'image/jpeg',
    'png':'image/png',
    'json': "application/json"
  }
  if(pathname === '/'){
    fs.readFile(__dirname + '/static/html/index.html',function(err, data){
      if(!err){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
      }else{
        res.writeHead(404, {'Content-Type': ContentType.filetype});
        res.end();
      }
    })
  }
  // else if(pathname === '/index'){
  //   fs.readFile('./static/json/list.json','utf8',function(err, data){
  //     console.log(__dirname +'/static/json/list.json');
  //     if(!err){
  //       res.writeHead(200, {'Content-Type':'application/json'});
  //       console.log(data);
  //       res.write(data);
  //       res.end();
  //     }else{
  //       res.writeHead(404, {'Content-Type': ContentType.filetype});
  //       res.end();
  //     }
  //   })
  // }
  else{
    filetype = pathname.slice(pathname.lastIndexOf('.')+1);
    filedir = (filetype === 'jpg' || filetype === 'png') ? 'img' : filetype;
    coding = (filetype === 'jpg' || filetype === 'png') ? 'base64' : 'utf8';
    filename = pathname.slice(pathname.lastIndexOf('/')+1);
    console.log(filetype,filedir,coding,filename);
    fs.readFile(__dirname + '/static/' + filedir +'/'+filename , coding ,function(err , data){
      console.log(__dirname + '/static/' + filedir +'/'+filename);
      if(!err){
        res.writeHead(200, {'Content-Type': ContentType[filetype]});
        res.write(data,coding);
        res.end();
      }else{
        res.writeHead(404, {'Content-Type': ContentType[filetype]});
        res.end();
      }
    })
  }
}).listen(7666, function(){
  console.log('7666.....');
});
