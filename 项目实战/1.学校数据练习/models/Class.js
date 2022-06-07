// 班级表
const sequelize = require("./db");
const Student = require("./Student");
const { DataTypes } = require('sequelize');

/**
 * 班级
 *    name 姓名
 *    openingTime 开班时间
 */
const Class = sequelize.define("Class", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  openingTime: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  // paranoid: true // 不会真实从数据库中删除
});

module.exports = Class;