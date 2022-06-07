// 书籍表

const sequelize = require("./db");
const { DataTypes } = require('sequelize');

/**
 *    name 名称
 *    imgUrl 图片
 *    publicationTime 出版时间
 *    author 作者
 */
module.exports = sequelize.define("Book", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imgUrl: {
    type: DataTypes.STRING
  },
  publicationTime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
}, {
  // paranoid: true // 不会真实从数据库中删除
})