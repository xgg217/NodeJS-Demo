/**
 * 定义表与表的关系
 */

const Classes = require("./Class");
const Student = require("./Student");
Classes.hasMany(Student);
Student.belongsTo(Classes);