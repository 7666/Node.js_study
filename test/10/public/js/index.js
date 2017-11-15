var user;
$('#logout').click(function(){
  $.ajax({
    method:'delete',
    url:'/index'
  }).done(function(data){
    if(data['status'] == 1){
      location.href = '/login';
    }
  });
});
document.cookie.replace(/user=(\w+)/g,function(match,p1,p2,index,str){
  console.log(match,p1,index,str);
  user = p1;
  $('#welcome').prepend(user);
})
