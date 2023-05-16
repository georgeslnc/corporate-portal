/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Professions', [
      {
        position: 'Специалист',
        rank: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        position: 'Главный специалист',
        rank: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        position: 'Начальник отдела',
        rank: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        position: 'Начальник департамента',
        rank: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        position: 'Супер-админ',
        rank: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Professions', null, {});
  },
};
