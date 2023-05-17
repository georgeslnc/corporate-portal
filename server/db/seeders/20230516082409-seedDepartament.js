/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Departaments',
      [
        {
          title: 'Департамент продаж',
          location: '1 этаж',
          departamentHeadId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Финансовый департамент',
          location: '2 этаж',
          departamentHeadId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Департамент информационный технологий',
          location: '3 этаж',
          departamentHeadId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Админстративно-хозяйственный отдел',
          location: '4 этаж',
          departamentHeadId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Департамент по работе с персоналом',
          location: '5 этаж',
          departamentHeadId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Departament', null, {});
  },
};
