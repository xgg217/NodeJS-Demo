// 登录
(function() {
  "use strict";

  const formElm = document.querySelector('form');
  const userINp = formElm.querySelector('.user');
  const pwdINp = formElm.querySelector('.pwd');
  const but = formElm.querySelector('.login');

  but.addEventListener('click', function() {

    const obj = {
      loginId: userINp.value,
      loginIdPwd: pwdINp.value
    };

    axios.post('/api/admin/login', obj).then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    })
  });
})();

// 添加用户
(function() {
  "use strict";

  const addBut = document.querySelector('.add');

  addBut.addEventListener('click', function() {
    const obj = {
      loginId: "xh",
      loginIdPwd: "123456",
      name: "小花"
    }
    axios.post('/api/admin/add', obj).then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    })
  })
})();

// ajax 上传图片
(function() {
  "use strict";

  const ajaxsmDom = document.querySelector('.ajaxsm');
  const txtDom = ajaxsmDom.querySelector('.txt');
  const filesDom = ajaxsmDom.querySelector('.files');
  const tjDom = ajaxsmDom.querySelector('.tj');

  tjDom.addEventListener('click', function() {
    console.log(txtDom.value);
    console.log(filesDom.value);
    console.log(filesDom.files); // 上传信息

    // 帮助构建 form-data 格式的消息体
    const formData = new FormData();

    formData.append('a', txtDom.value);
    formData.append('img', filesDom.files[0], filesDom.files[0].name);

    axios({
      url: '/api/upload/add',
      method: 'post',
      data: formData
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    })
  })
})();
