const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Departament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Group, { foreignKey: 'departamentId' });
    }
  }
  Departament.init({
    title: DataTypes.STRING,
    location: DataTypes.TEXT,
    departamentHeadId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Departament',
  });
  return Departament;
};
