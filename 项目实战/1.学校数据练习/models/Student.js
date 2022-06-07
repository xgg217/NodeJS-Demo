// 学生表

const sequelize = require("./db");
const { DataTypes } = require('sequelize');

/**
 *    name 姓名
 *    dateOfBirth 出生日期
 *    sex 性别
 *    phone 联系电话
 *     班级
 */
module.exports = sequelize.define("Student", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false
  },
  sex: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    get() {
      const val = this.getDataValue('sex');
      console.log(val);
      if(val) {
        return '男'
      }
      return '女'
    }
  },
  phone: {
    type: DataTypes.STRING(11), // 长度11位
    allowNull: false
  },
  
}, {
  // paranoid: true // 不会真实从数据库中删除
})
