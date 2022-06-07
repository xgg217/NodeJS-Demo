const Student = require("./../models/Student");

/**
 * 增加
 * @param {*} obj 
 */
 const addStudent = function(obj) {
  return Student.create(obj);
};


/**
 * 删除
 * @param {*} id 
 */
const delStudent = function(id) {
  Student.destroy({
    where: {
      id
    }
  }).then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  })
};

const updateStudent = function(id, obj) {
  Student.update(obj, {
    where: {
      id: id
    }
  }).then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  })
};

/**
 * 
 * @param {*} page 当前页
 * @param {*} limit 一页几条
 * @param {number} sex 性别
 * @returns 
 */
const getStudents = function(page = 1, limit = 10, sex = -1) {
  // const obj = {
  //   arr: [],
  //   count: 0
  // }
  // return Student.findAll({
  //   offset: (page - 1) * limit,
  //   limit:limit
  // }).then(data => {
  //   if(data) {
  //     obj.arr = JSON.parse(JSON.stringify(data));
  //   }
  //   return Student.count();
  // }).then(data => {
  //   console.log(data);
  //   if(data) {
  //     obj.count = data;
  //   }
  //   return obj;
  // }).catch(err => {
  //   console.log(err);
  // })
  return Student.findAndCountAll({
    // where: {
    //   sex
    // },
    offset: (page - 1) * limit,
    limit:limit
  }).then(data => {
    console.log(data);
    if(data) {
      return JSON.parse(JSON.stringify(data));
    }
    return {}
  }).catch(err => {
    console.log(err);
    return err
  });
};

module.exports = {
  addStudent,
  delStudent,
  updateStudent,
  getStudents
}