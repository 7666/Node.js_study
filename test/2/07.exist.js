var fs = require('fs');

console.log(fs.constants.W_OK);


fs.access('book.txt',fs.constants.R_OK,(err)=>{
  console.log(err);
})
