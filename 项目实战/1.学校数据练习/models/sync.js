// 同步所有模型
require("./Book");
require("./Class");
require("./Student");
require("./Admin");
const sequelize = require("./db");

(async () => {
  sequelize.sync({ force: true });
  console.log("用户模型表刚刚(重新)创建！");
})();

