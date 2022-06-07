import sequelize from './db';
import { 
  Sequelize,
  Model,
  ModelDefined,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from 'sequelize';

interface IAdmin  {
  id: number;
  loginId: string;
  loginIdPwd: string;
  name: string;
}

interface ICreationAdmin extends Optional<IAdmin , 'id'> {}

class Admin extends Model<IAdmin, ICreationAdmin> implements IAdmin {
  public id!: number;
  public name!: string;
  public loginId!: string;
  public loginIdPwd!: string;

  // public getProjects!: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
  // public addProject!: HasManyAddAssociationMixin<Project, number>;
  // public hasProject!: HasManyHasAssociationMixin<Project, number>;
  // public countProjects!: HasManyCountAssociationsMixin;
  // public createProject!: HasManyCreateAssociationMixin<Project>;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
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
    tableName: 'users',
    sequelize, // passing the `sequelize` instance is required
  }
)


export default Admin;
