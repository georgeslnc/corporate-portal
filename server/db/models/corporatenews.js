const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CorporateNews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CorporateNews.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'CorporateNews',
    },
  );
  return CorporateNews;
};
