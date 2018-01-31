
var userobj = null;
// 获得距离啥的
$('#tijiao').on('click', function(){
  if($('#name').val() == '' && $('#didian').val() == '') {
    alert('请填写信息');
    return ;
  }
  $.ajax({
    type: 'POST',
    url: 'http://115.159.120.134/user',
    // data to be added to query string:
    data: { 
      name: $('#name').val(),
      from: $('#didian').val()
    },
    // type of data we are expecting in return:
    dataType: 'json',
    success: function(data){
      // this.append(data.project.html)
      $('.page-9 .one').text(data.distance);
      $('.page-9 .two').text(data.all_user);
      $('.page-10 .one').text('现价' + data.price + '元');
      $('.page-10 .banmian textarea').val(data.share_url);

      //设置进度条
      $('.process-kuang').css('margin-left', 100 - (data.price*1.0 / data.distance)*100 - 5 + '%' );
      $('.process-huang').css('width', 100 - (data.price*1.0 / data.distance)*100 + '%');
      $.fn.fullpage.moveNext(true);
      userobj = data;
    },
    error: function(xhr, type){
      console.log('Ajax error!');
      alert('网络不好，请刷新重试');
    },
  })
});

// 获得全部城市
var cityobj = null;
$.ajax({
  type: 'GET',
  url: '../media/citys.txt',
  dataType: 'json',
  contentType: "application/x-www-form-urlencoded; charset=utf-8",
  success: function(data){
    cityobj = data.provinces;
    console.log(cityobj);
    // for(var i of cityobj){
    //   $('#sheng')
    // }
    cityobj.forEach(function(city, index) {
      $('#sheng').append('<option value='+ index +'>'+ city.provinceName +'</option>');
    });
  },
  error: function(data){
    alert('城市获取失败，请重试');
  }
})

// 选择市
$('#sheng').on('change', function() {
  if($('#sheng').val() !== '' || $('#sheng').val() !== null){
    $('#didian option').remove();
    cityobj[parseInt($('#sheng').val())].citys.forEach(function(city, index) {
      $('#didian').append('<option value='+ city.citysName +'>'+ city.citysName +'</option>');
    });
  }
})

// 领取
$('#lingqu').on('click', function() {
  if(userobj.price == 0) alert('获得免费火车票！请去现场领取')
  else alert('您的火车票还没砍至0元，快邀请小红包来帮忙吧！');
});

$('#kanjia, .page-10 .banmian .guan').on('click', function() {
  $('.page-10 .motai').toggle()
})




