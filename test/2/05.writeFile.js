var fs = require('fs');

fs.writeFile('./book.txt','hello world',{encoding:'utf8',flag:'w',mode:0o666},(err)=>{
  console.log(err);
})
