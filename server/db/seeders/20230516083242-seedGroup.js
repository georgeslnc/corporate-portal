/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Groups',
      [
        {
          title: 'Отдел по работе с клиентами',
          departamentId: 1,
          groupHeadId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Отдел маркетинга',
          departamentId: 1,
          groupHeadId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Бухгалтерия',
          departamentId: 2,
          groupHeadId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Планово-экономический отдел',
          departamentId: 2,
          groupHeadId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Отдел разработки',
          departamentId: 3,
          groupHeadId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Отдел системных администраторов',
          departamentId: 3,
          groupHeadId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Отдел технического персонала',
          departamentId: 4,
          groupHeadId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Отдел административного персонала',
          departamentId: 4,
          groupHeadId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Отдел кадрового учета',
          departamentId: 5,
          groupHeadId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Отдел подбора персонала',
          departamentId: 5,
          groupHeadId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Groups', null, {});
  },
};
