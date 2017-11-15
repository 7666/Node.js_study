$('#btn').click(function(){
  var user = $('#user').val();
  var pw = $('#pw').val();
  if(user && pw){
    $.ajax({
      method:'POST',
      url:'/login',
      data:{user:user,pw:pw}
    }).done(function(data){
      if(data['status']==0){
        console.log('登录失败!!');
      }else if(data['status']==1){
        location.href = '/index';
      }
    })
  }
});
$(document).on('keyup',function(e){
  if(e.which == 13){
    $('#btn').trigger('click');
  }
});
