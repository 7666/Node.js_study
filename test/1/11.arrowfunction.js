var kai = (a, b) => a + b;

console.log(kai(1, 2));

var name = 'kai';
function k(){
  setTimeout(function(){
    console.log(this.name);
  },1000)
  console.log(this.name);
}
// k();

k.call({name:'wang'});
