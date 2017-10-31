module.exports = {
  add:function(){
    console.log('add');
  },
  app:function(){
    console.log('app');
  },
  value:10

}
console.log(111);
console.log(require);

if(require.main === module){
  console.log(222);
}
if(require.main.filename === __filename){
  console.log(333);
}
