import Admin from './Admin'
import sequelize from './db';
(async () => {
  // sequelize.sync({ force: true });
  sequelize.sync();
  console.log("模型表刚刚(重新)创建！");
})();

export {
  Admin,
  sequelize
}





