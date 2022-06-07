
// 登录
(function() {
  "use strict";

  const nameInp = document.querySelector('.names');
  const pwdInp = document.querySelector('.pwd');
  const butInp = document.querySelector('.but');

  // console.log(nameInp.value);
  butInp.addEventListener('click', function() {
    const obj = {
      loginId:nameInp.value,
      loginIdPwd: pwdInp.value
    };
    console.log(obj);

    axios.post(`/api/admin/login`, obj).then(data => {
      console.log(data);
    }).catch(err => {
      console.error(err);
    })
  }, false);

})();


// 获取列表
(function() {
  "use strict";

  const stBut = document.querySelector('.sbut');

 
  stBut.addEventListener('click', function() {

    axios.get(`/api/student/student?page=1&limit=10`).then(data => {
      console.log(data);
    }).catch(err => {
      console.error(err);
    })
  }, false);

})();

// 获取列表
(function() {
  "use strict";

  // axios.get(`http://localhost:3000/api/student/student?page=1&limit=10`).then(data => {
  //   console.log(data);
  // }).catch(err => {
  //   console.error(err);
  // })

  axios.post('/api/student/student').then(data => {
    console.log(data);
  }).catch(err => {
    console.error(err);
  })

  // axios.get(`/api/student/student?page=1&limit=10`).then(data => {
  //   console.log(data);
  // }).catch(err => {
  //   console.error(err);
  // })

})();
