'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class news extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      news.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser"
        }
      })
    }
  }
  news.init({
    newsImg: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    job: DataTypes.TEXT,
    location: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'news',
  });
  return news;
};