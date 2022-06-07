const Classes = require("./../models/Class");

/**
 * 增加
 * @param {*} obj 
 */
 const addClass = function(obj) {
  return Classes.create(obj);
};


/**
 * 删除
 * @param {*} id 
 */
const delClass = function(id) {
  Classes.destroy({
    where: {
      id
    }
  }).then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  })
};

const updateClass = function(id, obj) {
  Classes.update(obj, {
    where: {
      id: id
    }
  }).then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  })
};

module.exports = {
  addClass,
  delClass,
  updateClass
}