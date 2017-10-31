function A(){
  console.log('aaaa');
}

function B(){
  console.log('bbbb');
}

function C(){
  console.log('cccc');
}

function D(){
  console.log('dddd');
}

A();
setImmediate(B);
C();


process.nextTick(D);
