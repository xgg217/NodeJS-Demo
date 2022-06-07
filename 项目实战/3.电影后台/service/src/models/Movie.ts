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

interface IMovie {
  id: number;
  name: string;
  types: string[];
  areas:string[];
  timeLong:number;
  isHot:boolean;
  isComing:boolean;
  isCLasic:boolean;
  description?:string;
  poster?:string;
}

interface ICreationMovie extends Optional<IMovie , 'id'> {}

class Movie extends Model<IMovie, ICreationMovie> implements IMovie {
  public id!: number;
  public name!: string; // 电影名称
  public types!: string[]; // 电影类型
  public areas!: string[]; // 地区
  public timeLong!: number; // 电影时长
  public isHot!: boolean; // 是否热映
  public isComing!: boolean; // 是否即将上映
  public isCLasic!: boolean; // 是否是经典电影 
  public description?: string; // 简介
  public poster?: string; // 海报
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false // 是否允许出现null, 默认为 true
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false // 是否允许出现null, 默认为 true
    },
    areas: {
      type: DataTypes.STRING,
      allowNull: false // 是否允许出现null, 默认为 true
    },
    timeLong: {
      type: DataTypes.NUMBER,
      allowNull: false // 是否允许出现null, 默认为 true
    },
    isHot: {
      type: DataTypes.BOOLEAN,
      allowNull: false // 是否允许出现null, 默认为 true
    },
    isComing: {
      type: DataTypes.BOOLEAN,
      allowNull: false // 是否允许出现null, 默认为 true
    },
    isCLasic: {
      type: DataTypes.BOOLEAN,
      allowNull: false // 是否允许出现null, 默认为 true
    },
    description: {
      type: DataTypes.TEXT
    },
    poster: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'movies',
    sequelize, // passing the `sequelize` instance is required
  }
)

export default Movie;


