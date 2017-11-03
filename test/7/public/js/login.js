$('.btn').click(function(){
  var user = $('.user').val();
  var pw =$('.pw').val();
  if(pw && user){
    $.ajax({
      method:'POST',
      url:'/login',
      data:{user:user,pw:pw}
    }).done(function(data){
      console.log(22);
      if(data.static == 1){
        console.log(11);
        location.href = '/manage';
      }else{
        $('.err').show();
      }
    }).fail(function(){
        $('.login').show();
    })
  }
})
