process.stdin.setEncoding('utf8');

/*
process.stdin.on('readable',function(e){
  console.log(process.stdin.read());
  process.stdout.write('hello world');
})

process.stdin.on('data',function(data){
  console.log(data);
})
*/


(process.stdin).pipe(process.stdout)
