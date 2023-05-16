'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Employee, {foreignKey: 'groupId'}),
      this.hasMany(models.Offer, {foreignKey: 'groupId'}),
      this.belongsTo(models.Departament, {foreignKey: 'departamentId'}),
    }
  }
  Group.init({
    title: DataTypes.STRING,
    departamentId: DataTypes.INTEGER,
    groupHeadId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};