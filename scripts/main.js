layui.use('laytpl', function () {
  var laytpl = layui.laytpl;
  var element = layui.element;
  var getTpl = laytpl_demo.innerHTML
    , view = document.getElementById('view');
  laytpl(getTpl).render(data, function (html) {
    view.innerHTML = html;
  });
});
//注意：折叠面板 依赖 element 模块，否则无法进行功能性操作
layui.use('element', function () {
  var element = layui.element;
  
  //…
});