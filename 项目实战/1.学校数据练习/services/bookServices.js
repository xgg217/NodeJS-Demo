const Book = require("./../models/Book");


/**
 * 增加
 * @param {*} obj 
 */
const addBook = function(obj) {
  return Book.create(obj);
};


/**
 * 删除
 * @param {*} id 
 */
const delBook = function(id) {
  Book.destroy({
    where: {
      id
    }
  }).then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  })
};

const updateBook = function(id, obj) {
  Book.update(obj, {
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
  addBook,
  delBook,
  updateBook
}