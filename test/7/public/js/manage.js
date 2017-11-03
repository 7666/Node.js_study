$('.c').click(function(){
    $('.c').siblings().removeClass('active');
    $('.c').addClass('active');
    $('.search').siblings().removeClass('active');
    $('.search').addClass('active');
    search({});
});
$('.t').click(function(){
  $('.t').siblings().removeClass('active');
  $('.t').addClass('active');
  $('.add').siblings().removeClass('active');
  $('.add').addClass('active');
});
$('.g').click(function(){
  $('.g').siblings().removeClass('active');
  $('.g').addClass('active');
  $('.modifi').siblings().removeClass('active');
  $('.modifi').addClass('active');
  searchMidifi({});
});
$('.s').click(function(){
  $('.s').siblings().removeClass('active');
  $('.s').addClass('active');
  $('.delete').siblings().removeClass('active');
  $('.delete').addClass('active');
  searchRemove({});
})

//请求所有数据库数据
function search(d){
$.ajax({
  method:'GET',
  url:'/search',
  data:d
}).done(function(data){
    $('.info').empty();
    $('.info').append('<tr><th>姓名</th><th>性别</th><th>年龄</th><th>成绩</th></tr>');
    for(var i = 0;i < data.length;i++){
      var name = data[i]['姓名'];
      var age = data[i]['年龄'];
      var sex = data[i]['性别'];
      var score = data[i]['成绩'];
      $('.info').append('<tr><td>'+name+'</td><td>'+sex+'</td><td>'+age+'</td><td>'+score+'</td></tr>');
    }
}).fail(function(){

})
}
search({});


//查找数据
$('.all').change(function(){
  console.log($('.all').val());
  if($('.all').val() == '所有'){
    $('.dian').unbind();
    search({});
  }else if($('.all').val() == '姓名'){
    $('.dian').unbind();
    $('.dian').click(function(){
      var name = $('.choose').val();
      if(name){
        search({姓名:name});
      }
    });
  }else if($('.all').val() == '性别'){
    $('.dian').unbind();
    $('.dian').click(function(){
      var sex = $('.choose').val();
      if(sex){
        search({性别:sex});
      }
    });

  }else if($('.all').val() == '成绩'){
    $('.dian').unbind();
    $('.dian').click(function(){
      var score = $('.choose').val();
      if(score){
        search({成绩:score});
      }
    });
  }
});

//添加数据

function add(d){
$.ajax({
  method:'POST',
  url:'/add',
  data:d
}).done(function(data){
  console.log(data['status']);
  if(data['status'] == 1){
    $('.success').show();
  }
}
).fail(function(){

})
}

$('.tijiao').click(function(){
  if($('.input1').val() && $('.input2 option:selected').text() && $('.input3').val() && $('.input4').val()){
    var data = {姓名:$('.input1').val(),性别:$('.input2 option:selected').text(),年龄:$('.input3').val(),成绩:$('.input4').val()};
    add(data);
  }
})


//删除数据
function remove(d){
  $.ajax({
    method:'delete',
    url:'/remove',
    data:d
  }).done(function(data){
    searchRemove({});
    if(data['status'] == 1){
      $('.delsuccess').show();
    }
  }
  ).fail(function(){

  })
}


//生成所有数据以备删除
function searchRemove(d){
$.ajax({
  method:'GET',
  url:'/search',
  data:d
}).done(function(data){
    $('.delInfo').empty();
    $('.delInfo').append('<tr><th>姓名</th><th>性别</th><th>年龄</th><th>成绩</th><th>删除</th></tr>');
    for(let i = 0;i < data.length;i++){
      let name = data[i]['姓名'];
      let age = data[i]['年龄'];
      let sex = data[i]['性别'];
      let score = data[i]['成绩'];
      $('.delInfo').append('<tr n = '+ name +'><td>'+name+'</td><td>'+sex+'</td><td>'+age+'</td><td>'+score+'</td><td><button class="del">删除</button></tr>');
      $('tr[n='+name+']').click(function(){
        remove({姓名:name,性别:sex,年龄:age,成绩:score});
      })
    }
}).fail(function(){

})
}
searchRemove({});


//修改数据
function midifi(d){
  console.log(d);
$.ajax({
  method:'put',
  url:'/midifi',
  data:d
}).done(function(data){
  if(data['status'] == 1){
  }
}).fail(function(){

})
}

//生成数据以备修改
function searchMidifi(d){
$.ajax({
  method:'get',
  url:'/search',
  data:d
}).done(function(data){
    $('.miInfo').empty();
    $('.miInfo').append('<tr><th>姓名</th><th>性别</th><th>年龄</th><th>成绩</th><th>删除</th></tr>');
    for(let i = 0;i < data.length;i++){
      let name = data[i]['姓名'];
      let age = data[i]['年龄'];
      let sex = data[i]['性别'];
      let score = data[i]['成绩'];
      $('.miInfo').append('<tr n = '+ name +'><td>'+name+'</td><td>'+sex+'</td><td>'+age+'</td><td>'+score+'</td><td><button class="xiu">修改</button></tr>');
      $('tr[n='+name+'] .xiu').click(function(){
        var nowdata = {'姓名':name,'性别':sex,'年龄':age,'成绩':score};
        $('.show').show();
        $('.show1').val(name);
        $('.show2').val(sex);
        $('.show3').val(age);
        $('.show4').val(score);
        $('.close').click(function(){
          $('.show').hide();
          searchMidifi({});
        });
        $('.xiugai').click(function(){
          var midifidata = {'姓名':$('.show1').val(),'性别':$('.show2 option:selected').val(),'年龄':$('.show3').val(),'成绩':$('.show4').val()};
          // midifi({before:nowdata,nowdata:midifidata});

          midifi({before:JSON.stringify(nowdata),nowdata:JSON.stringify(midifidata)});
          $('.show').hide();
          searchMidifi({})
        })
      })
    }
}).fail(function(){

})
}
searchMidifi({});
