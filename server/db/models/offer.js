'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Employee, {foreignKey: 'employeesId'}),
      this.belongsTo(models.Group, {foreignKey: 'groupId'}),
    }
  }
  Offer.init({
    title: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    employeesId: DataTypes.INTEGER,
    deadline: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Offer',
  });
  return Offer;
};