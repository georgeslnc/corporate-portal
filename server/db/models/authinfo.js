const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AuthInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AuthInfo.init(
    {
      userId: DataTypes.INTEGER,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'AuthInfo',
    },
  );
  return AuthInfo;
};
