function readFiles(dir){
  var fs = require('fs');

  fs.readdir(dir,function(err, files){
    files.forEach(function(data, index){
      var file = [dir];
      file.push(data);
      var f = file.join('/');
      fs.stat(f,function(err, stats){
        if(stats.isFile()){
          console.log(data);
        }else{
          readFiles(f);
        }
      })
    })
  })
};

readFiles('..');


//封装函数实现,遍历目录,将目录中所有的文件显示,包括子目录;
