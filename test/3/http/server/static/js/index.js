var btn = document.querySelector('button');
var table = document.querySelector('table');
btn.addEventListener('click',function(){
  $.ajax({
    method : 'post',
    url: "/list.json",
    success:function(data, textStatus, jqXHR){
      console.log(data);
      data.student.forEach(function(item ,index){
        $(table).append('<tr><td>' + item.name + '</td><td>' + item.age + '</td><td>' + item.score + '</td></tr>');
      })
    },
    error:function(a,b,c){
      console.log(a);
      console.log(b);
      console.log(c);
    }
  })
});
