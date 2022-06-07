import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('maoyandb', 'root', '081213', {
  host: 'localhost',
  dialect: 'mysql' /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});

export default sequelize;

