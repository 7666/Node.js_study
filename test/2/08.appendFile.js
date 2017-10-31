var fs = require('fs');

fs.appendFile('book.txt','hello world','utf8',(err)=>{
  console.log(err);
})
