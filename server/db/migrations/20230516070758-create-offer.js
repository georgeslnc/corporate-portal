/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      groupId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Groups',
          },
          key: 'id',
        },
      },
      employeesId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Employees',
          },
          key: 'id',
        },
      },
      employeesCloseId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Employees',
          },
          key: 'id',
        },
      },
      deadline: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Offers');
  },
};
