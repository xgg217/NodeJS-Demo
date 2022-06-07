const Admin = require("./../models/Admin");

/**
 * 增加
 * @param {}} obj 
 */
const addAdmin = function(adminObj) {
  // 1. 应该需要判断 adminObj 的各种属性是否合理
  // 2. 账号是否已经存在
  return Admin.create(adminObj);
};

/**
 * 删除
 * @param {*} adminId 
 */
const delAdmin = function(adminId) {
  Admin.destroy({
    where: {
      id: adminId
    }
  }).then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  })
}

/**
 * 更新
 */
const updateAdmin = function(adminId, adminObj) {

  /**
   * 方法2 
   */
  Admin.update(adminObj, {
    where: {
      id: adminId
    }
  }).then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  })
};

/**
 * 登录
 * @param {string} loginId 登录账号
 * @param {string} loginPwd 登录密码
 * @returns 
 */
const loginFun = function(loginId, loginPwd) {
  return Admin.findOne({
    where: {
      loginId,
      loginIdPwd:loginPwd
    }
  });
};

/**
 * 查询管理员
 * @param {number} ids 登录账号
 */
const getAdmin = function(ids) {
  return Admin.findByPk(ids).then(data => {
    if(data) {
      return data.toJSON();
    }
  }).catch(err => {
    console.log(err);
  })
};


/**
 * 获取所有管理员
 * @returns 
 */
const getAllAdmin = function() {
  return Admin.findAll().then(data => {
    if(data) {
      return JSON.stringify(data);
    }
    return []
  }).catch(err => {
    console.log(err);
  });
};

module.exports = {
  addAdmin,
  delAdmin,
  updateAdmin,
  loginFun,
  getAdmin,
  getAllAdmin
}
