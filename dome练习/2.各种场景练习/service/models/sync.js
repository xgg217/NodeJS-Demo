// 同步所有模型
require("./Admin");
require("./Book");
const sequelize = require("./db");
(async () => {
  // sequelize.sync({ force: true });
  sequelize.sync();
  console.log("用户模型表刚刚(重新)创建！");
})();