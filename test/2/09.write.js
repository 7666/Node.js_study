var fs = require('fs');

fs.open('book.txt','r+',(err, f)=>{
  console.log(err);
  console.log(`fn = ${f}`);
  fs.write(f,'ooooo',9,(err)=>{
    console.log(err);
  })
})
