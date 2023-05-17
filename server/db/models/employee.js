const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Group, { foreignKey: 'groupId' });
      this.belongsTo(models.Profession, { foreignKey: 'professionId' });
      this.hasMany(models.Offer, { foreignKey: 'employeesId' });
    }
  }
  Employee.init(
    {
      firstName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      groupId: DataTypes.INTEGER,
      professionId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      birthday: DataTypes.STRING,
      photoUrl: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Employee',
    },
  );
  return Employee;
};
