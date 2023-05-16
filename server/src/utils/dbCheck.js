const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DEV_DB_URL);

async function checkConnect() {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Database not connected ==>', error);
    process.exit(1);
  }
}

module.exports = checkConnect;
