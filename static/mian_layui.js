// layui主体
layui.use(['laydate'], function(){
  var laydate = layui.laydate;
  
  //日期
  laydate.render({
    elem: '#date'
  });
});