$(function () {
  // 当刷新页面渲染数据
  load();
  // 为文本框绑定键盘抬起事件
  $('#title').on('keydown', function (e) {
    // 判断输入的键的ASCII值是否为13(回车键)
    if (e.keyCode === 13) {
      // 判断输入的值是否为空
      if ($(this).val() === '') {
        alert('请输入ToDo！')
      } else {
        // 通过 getData 获取本地存储数据 保存到local数组
        var local = getData();
        // push 方法添加数据
        local.push({ title: $(this).val(), done: false });
        // 将添加完成的local数据作为实参 调用 saveData 保存数据
        saveData(local);
        // 渲染数据
        load();
        // 清空输入框
        $(this).val('');
      }
    }
  })

  // toDoList 删除操作
  $('ol,ul').on('click', 'a', function () {
    // 获取数据
    var data = getData()
    // 修改数据
    // 通过 attr 获取自定义属性 id 
    var index = $(this).attr('id')
    // 删除索引对应的数据
    data.splice(index, 1)
    // 保存数据
    saveData(data);
    // 渲染数据
    load();
  })

  // 切换完成状态
  $('ol,ul').on('click', 'input', function () {
    // 获取数据
    var data = getData();
    // 修改数据
    // 通过当前 input 的兄弟 a 的 id 来获取对应的索引
    var index = $(this).siblings('a').attr('id');
    // 通过当前 input 的 prop() 获取固有属性 checked 修改当前数据的done
    data[index].done = $(this).prop('checked');
    // 保存数据
    saveData(data);
    // 渲染数据
    load();
  })

  // 读取本地存储数据
  function getData () {
    var data = localStorage.getItem('todolist');
    if (data !== null) {
      // 将json字符串 转换 对象数组
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  // 存储本地数据
  function saveData (data) {
    localStorage.setItem('todolist', JSON.stringify(data));
  }

  // 渲染数据
  function load () {
    var data = getData()
    // 遍历之前先要清空ol里面的元素内容
    $("ol,ul").empty();
    // 方法1
    // var todoCount = 0; // 正在进行的个数
    // var doneCount = 0; // 已经完成的个数
    $.each(data, function (i, n) {
      // if判断添加的数据是未完成还是已完成
      if (!n.done) {
        // prepend()在前面添加
        $('ol').prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>")
        // todoCount++
      } else {
        $('ul').prepend("<li><input type='checkbox' checked><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>")
        // doneCount++;
      }
    })
    //统计数据
    //方法2 获取生成li的数组长度
    var todoCount = $('ol li').length
    var doneCount = $('ul li').length
    $("#todocount").text(todoCount);
    $("#donecount").text(doneCount);
  }
})