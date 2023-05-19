/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'News',
      [
        {
          title: 'Обновление системы заказов',
          content:
            'Мы рады сообщить о важном обновлении системы заявок. Теперь вы можете легко отслеживать статус вашей заявки и получать уведомления об ее выполнении.',
          publishedAt: new Date('2023-04-18'),
          createdAt: new Date('2023-05-18'),
          updatedAt: new Date('2023-05-18'),
        },
        {
          title: 'Партнерство с ведущими поставщиками',
          content: 'Мы рады сообщить о заключении партнерских соглашений с ведущими поставщиками оборудования. Благодаря этому партнерству мы получаем доступ к передовым технологиям и материалам, что позволяет нам предлагать клиентам инновационные решения и повышать конкурентоспособность на рынке.',
          publishedAt: new Date('2023-05-03'),
          createdAt: new Date('2023-05-18'),
          updatedAt: new Date('2023-05-18'),
        },
      ],

      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
