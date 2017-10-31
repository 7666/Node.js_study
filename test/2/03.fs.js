var fs = require('fs');

fs.readFile('./02.function.html','utf8',function(err, data){
  console.log(data);
});

fs.readdir('..','utf8',function(err, files){
  console.log(err);
  console.log(files);
});

fs.stat('..',function(err, stat){
  if(stat.isFile()){
    console.log(111);
  }else if(stat.isDirectory()){
    console.log(222);
  }
});
