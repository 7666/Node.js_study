console.log(process.argv);

process.argv.forEach(function(every, index){
  console.log(every, index);
})

for(var i = 0; ;i++){
  if(i ==10){
    process.exit(0);
  }
  console.log(i);
}
