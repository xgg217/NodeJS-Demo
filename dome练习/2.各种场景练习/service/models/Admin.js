// 管理员表
const sequelize = require("./db");

const { DataTypes } = require('sequelize');

/**
 * 创建一个模型对象
 * 字段
 *    id 自动生成
 *    loginId 账号
 *    loginIdPwd 密码
 *    name 姓名
 * 
 * 返回模型对象
 */
module.exports = sequelize.define('Admin', {
  loginId: {
    type: DataTypes.STRING, // 字符串类型
    allowNull: false // 是否允许出现null, 默认为 true
  },
  loginIdPwd: {
    type: DataTypes.STRING,
    allowNull: false // allowNull 默认为 true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  createdAt: false, // 是否需要 createdAt 字段， false 不想要
  updatedAt: false,
  // paranoid: true // 不会真实从数据库中删除
});
