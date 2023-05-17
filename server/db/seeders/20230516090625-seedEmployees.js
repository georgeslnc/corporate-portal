/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Employees',
      [
        {
          firstName: 'Сергей',
          middleName: 'Александрович',
          lastName: 'Смирнов',
          groupId: 1,
          professionId: 4,
          email: 'smirnov0@example.com',
          phone: '+7 (979) 954-2263',
          birthday: '1986-12-14',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Андрей',
          middleName: 'Игоревич',
          lastName: 'Кузнецов',
          groupId: 3,
          professionId: 4,
          email: 'kuznetsov1@example.com',
          phone: '+7 (959) 898-1618',
          birthday: '1977-09-17',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Алексей',
          middleName: 'Павлович',
          lastName: 'Смирнов',
          groupId: 5,
          professionId: 4,
          email: 'smirnov2@example.com',
          phone: '+7 (973) 800-9921',
          birthday: '1983-06-26',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Наталья',
          middleName: 'Николаевна',
          lastName: 'Миронова',
          groupId: 7,
          professionId: 4,
          email: 'mironova3@example.com',
          phone: '+7 (955) 158-7696',
          birthday: '1989-01-03',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Елена',
          middleName: 'Васильевна',
          lastName: 'Петрова',
          groupId: 9,
          professionId: 4,
          email: 'petrova4@example.com',
          phone: '+7 (952) 431-9901',
          birthday: '1987-07-15',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Татьяна',
          middleName: 'Алексеевна',
          lastName: 'Морозова',
          groupId: 1,
          professionId: 3,
          email: 'morozova5@example.com',
          phone: '+7 (952) 811-8994',
          birthday: '1985-03-19',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Сергей',
          middleName: 'Петрович',
          lastName: 'Соколов',
          groupId: 2,
          professionId: 3,
          email: 'sokolov6@example.com',
          phone: '+7 (969) 342-2421',
          birthday: '1963-01-20',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Анна',
          middleName: 'Дмитриевна',
          lastName: 'Федорова',
          groupId: 3,
          professionId: 3,
          email: 'fedorova7@example.com',
          phone: '+7 (907) 778-8690',
          birthday: '1967-03-03',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Наталья',
          middleName: 'Викторовна',
          lastName: 'Попова',
          groupId: 4,
          professionId: 3,
          email: 'popova8@example.com',
          phone: '+7 (949) 391-5985',
          birthday: '1984-01-13',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Иван',
          middleName: 'Иванович',
          lastName: 'Игнатьев',
          groupId: 5,
          professionId: 3,
          email: 'ignatiev9@example.com',
          phone: '+7 (944) 539-2752',
          birthday: '1967-07-14',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Марина',
          middleName: 'Николаевна',
          lastName: 'Миронова',
          groupId: 6,
          professionId: 3,
          email: 'mironova10@example.com',
          phone: '+7 (939) 829-2145',
          birthday: '1968-10-04',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Анна',
          middleName: 'Ивановна',
          lastName: 'Попова',
          groupId: 7,
          professionId: 3,
          email: 'popova11@example.com',
          phone: '+7 (975) 984-6903',
          birthday: '1966-04-27',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Иван',
          middleName: 'Иванович',
          lastName: 'Кузнецов',
          groupId: 8,
          professionId: 3,
          email: 'kuznetsov12@example.com',
          phone: '+7 (953) 880-4905',
          birthday: '1986-06-07',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Анна',
          middleName: 'Андреевна',
          lastName: 'Попова',
          groupId: 9,
          professionId: 3,
          email: 'popova13@example.com',
          phone: '+7 (973) 640-1008',
          birthday: '1979-08-03',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Иван',
          middleName: 'Иванович',
          lastName: 'Кузнецов',
          groupId: 10,
          professionId: 3,
          email: 'kuznetsov14@example.com',
          phone: '+7 (916) 722-7515',
          birthday: '1987-12-18',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Дмитрий',
          middleName: 'Сергеевич',
          lastName: 'Лебедев',
          groupId: 6,
          professionId: 1,
          email: 'lebedev15@example.com',
          phone: '+7 (955) 512-3084',
          birthday: '1984-09-28',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Иван',
          middleName: 'Иванович',
          lastName: 'Соколов',
          groupId: 6,
          professionId: 2,
          email: 'sokolov16@example.com',
          phone: '+7 (984) 553-2995',
          birthday: '1967-05-11',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Дмитрий',
          middleName: 'Иванович',
          lastName: 'Смирнов',
          groupId: 7,
          professionId: 2,
          email: 'smirnov17@example.com',
          phone: '+7 (958) 691-8608',
          birthday: '1972-04-02',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Анна',
          middleName: 'Александровна',
          lastName: 'Соловьева',
          groupId: 9,
          professionId: 2,
          email: 'solovieva18@example.com',
          phone: '+7 (972) 430-9858',
          birthday: '1986-02-02',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Ольга',
          middleName: 'Андреевна',
          lastName: 'Соловьева',
          groupId: 1,
          professionId: 1,
          email: 'solovieva19@example.com',
          phone: '+7 (955) 639-4239',
          birthday: '1967-11-14',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Мария',
          middleName: 'Дмитриевна',
          lastName: 'Сидорова',
          groupId: 6,
          professionId: 1,
          email: 'sidorova20@example.com',
          phone: '+7 (942) 108-2929',
          birthday: '1965-05-17',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Дмитрий',
          middleName: 'Игоревич',
          lastName: 'Лебедев',
          groupId: 1,
          professionId: 1,
          email: 'lebedev21@example.com',
          phone: '+7 (907) 696-6519',
          birthday: '1971-11-26',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Марина',
          middleName: 'Викторовна',
          lastName: 'Петрова',
          groupId: 2,
          professionId: 2,
          email: 'petrova22@example.com',
          phone: '+7 (935) 214-1318',
          birthday: '1976-02-22',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Анна',
          middleName: 'Алексеевна',
          lastName: 'Иванова',
          groupId: 10,
          professionId: 1,
          email: 'ivanova23@example.com',
          phone: '+7 (971) 291-3072',
          birthday: '1962-08-13',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Анна',
          middleName: 'Викторовна',
          lastName: 'Федорова',
          groupId: 8,
          professionId: 2,
          email: 'fedorova24@example.com',
          phone: '+7 (959) 163-2952',
          birthday: '1983-02-18',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Наталья',
          middleName: 'Николаевна',
          lastName: 'Попова',
          groupId: 3,
          professionId: 2,
          email: 'popova25@example.com',
          phone: '+7 (907) 160-9549',
          birthday: '1979-08-16',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Сергей',
          middleName: 'Сергеевич',
          lastName: 'Соколов',
          groupId: 7,
          professionId: 2,
          email: 'sokolov26@example.com',
          phone: '+7 (962) 925-6191',
          birthday: '1960-04-22',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Павел',
          middleName: 'Павлович',
          lastName: 'Игнатьев',
          groupId: 3,
          professionId: 1,
          email: 'ignatiev27@example.com',
          phone: '+7 (975) 513-5675',
          birthday: '1986-04-10',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Дмитрий',
          middleName: 'Павлович',
          lastName: 'Соколов',
          groupId: 6,
          professionId: 1,
          email: 'sokolov28@example.com',
          phone: '+7 (915) 665-8425',
          birthday: '1971-04-19',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Алексей',
          middleName: 'Игоревич',
          lastName: 'Игнатьев',
          groupId: 7,
          professionId: 1,
          email: 'ignatiev29@example.com',
          phone: '+7 (953) 726-9840',
          birthday: '1962-03-08',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Сергей',
          middleName: 'Игоревич',
          lastName: 'Лебедев',
          groupId: 7,
          professionId: 1,
          email: 'lebedev30@example.com',
          phone: '+7 (950) 323-1179',
          birthday: '1962-01-18',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Наталья',
          middleName: 'Ивановна',
          lastName: 'Иванова',
          groupId: 3,
          professionId: 1,
          email: 'ivanova31@example.com',
          phone: '+7 (918) 404-7695',
          birthday: '1962-03-22',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Ольга',
          middleName: 'Александровна',
          lastName: 'Сидорова',
          groupId: 7,
          professionId: 2,
          email: 'sidorova32@example.com',
          phone: '+7 (927) 864-9243',
          birthday: '1974-11-04',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Дмитрий',
          middleName: 'Петрович',
          lastName: 'Игнатьев',
          groupId: 3,
          professionId: 1,
          email: 'ignatiev33@example.com',
          phone: '+7 (949) 466-4913',
          birthday: '1987-12-26',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Татьяна',
          middleName: 'Андреевна',
          lastName: 'Петрова',
          groupId: 10,
          professionId: 2,
          email: 'petrova34@example.com',
          phone: '+7 (915) 885-8176',
          birthday: '1983-03-14',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Анна',
          middleName: 'Александровна',
          lastName: 'Миронова',
          groupId: 5,
          professionId: 1,
          email: 'mironova35@example.com',
          phone: '+7 (964) 595-5238',
          birthday: '1981-09-11',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Андрей',
          middleName: 'Александрович',
          lastName: 'Игнатьев',
          groupId: 2,
          professionId: 1,
          email: 'ignatiev36@example.com',
          phone: '+7 (915) 683-8498',
          birthday: '1967-08-02',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Екатерина',
          middleName: 'Викторовна',
          lastName: 'Федорова',
          groupId: 3,
          professionId: 1,
          email: 'fedorova37@example.com',
          phone: '+7 (950) 631-3334',
          birthday: '1988-01-05',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Алексей',
          middleName: 'Павлович',
          lastName: 'Соколов',
          groupId: 9,
          professionId: 2,
          email: 'sokolov38@example.com',
          phone: '+7 (959) 733-3003',
          birthday: '1982-07-15',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Павел',
          middleName: 'Сергеевич',
          lastName: 'Игнатьев',
          groupId: 4,
          professionId: 1,
          email: 'ignatiev39@example.com',
          phone: '+7 (980) 217-6564',
          birthday: '1969-10-02',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Андрей',
          middleName: 'Павлович',
          lastName: 'Лебедев',
          groupId: 4,
          professionId: 1,
          email: 'lebedev40@example.com',
          phone: '+7 (991) 938-3359',
          birthday: '1981-05-14',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Сергей',
          middleName: 'Павлович',
          lastName: 'Кузнецов',
          groupId: 8,
          professionId: 2,
          email: 'kuznetsov41@example.com',
          phone: '+7 (917) 885-3821',
          birthday: '1986-06-17',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Мария',
          middleName: 'Александровна',
          lastName: 'Федорова',
          groupId: 4,
          professionId: 2,
          email: 'fedorova42@example.com',
          phone: '+7 (921) 188-9469',
          birthday: '1988-04-15',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Александр',
          middleName: 'Петрович',
          lastName: 'Лебедев',
          groupId: 1,
          professionId: 2,
          email: 'lebedev43@example.com',
          phone: '+7 (911) 397-9258',
          birthday: '1971-01-06',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Сергей',
          middleName: 'Иванович',
          lastName: 'Волков',
          groupId: 2,
          professionId: 2,
          email: 'volkov44@example.com',
          phone: '+7 (978) 376-5856',
          birthday: '1983-01-03',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Татьяна',
          middleName: 'Ивановна',
          lastName: 'Иванова',
          groupId: 7,
          professionId: 2,
          email: 'ivanova45@example.com',
          phone: '+7 (980) 186-1712',
          birthday: '1967-03-20',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Сергей',
          middleName: 'Александрович',
          lastName: 'Кузнецов',
          groupId: 6,
          professionId: 2,
          email: 'kuznetsov46@example.com',
          phone: '+7 (909) 183-7005',
          birthday: '1981-05-27',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Александр',
          middleName: 'Сергеевич',
          lastName: 'Игнатьев',
          groupId: 8,
          professionId: 1,
          email: 'ignatiev47@example.com',
          phone: '+7 (974) 823-9471',
          birthday: '1963-02-17',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Павел',
          middleName: 'Сергеевич',
          lastName: 'Игнатьев',
          groupId: 2,
          professionId: 1,
          email: 'ignatiev48@example.com',
          phone: '+7 (985) 124-3034',
          birthday: '1980-12-17',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Андрей',
          middleName: 'Иванович',
          lastName: 'Смирнов',
          groupId: 3,
          professionId: 1,
          email: 'smirnov49@example.com',
          phone: '+7 (965) 658-7877',
          birthday: '1975-03-11',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Мария',
          middleName: 'Дмитриевна',
          lastName: 'Сидорова',
          groupId: 6,
          professionId: 1,
          email: 'sidorova20@example.com',
          phone: '+7 (942) 108-2929',
          birthday: '1965-05-17',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Дмитрий',
          middleName: 'Игоревич',
          lastName: 'Лебедев',
          groupId: 1,
          professionId: 1,
          email: 'lebedev21@example.com',
          phone: '+7 (907) 696-6519',
          birthday: '1971-11-26',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Марина',
          middleName: 'Викторовна',
          lastName: 'Петрова',
          groupId: 2,
          professionId: 2,
          email: 'petrova22@example.com',
          phone: '+7 (935) 214-1318',
          birthday: '1976-02-22',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Анна',
          middleName: 'Алексеевна',
          lastName: 'Иванова',
          groupId: 10,
          professionId: 1,
          email: 'ivanova23@example.com',
          phone: '+7 (971) 291-3072',
          birthday: '1962-08-13',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Анна',
          middleName: 'Викторовна',
          lastName: 'Федорова',
          groupId: 8,
          professionId: 2,
          email: 'fedorova24@example.com',
          phone: '+7 (959) 163-2952',
          birthday: '1983-02-18',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Наталья',
          middleName: 'Николаевна',
          lastName: 'Попова',
          groupId: 3,
          professionId: 2,
          email: 'popova25@example.com',
          phone: '+7 (907) 160-9549',
          birthday: '1979-08-16',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Сергей',
          middleName: 'Сергеевич',
          lastName: 'Соколов',
          groupId: 7,
          professionId: 2,
          email: 'sokolov26@example.com',
          phone: '+7 (962) 925-6191',
          birthday: '1960-04-22',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Павел',
          middleName: 'Павлович',
          lastName: 'Игнатьев',
          groupId: 3,
          professionId: 1,
          email: 'ignatiev27@example.com',
          phone: '+7 (975) 513-5675',
          birthday: '1986-04-10',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Дмитрий',
          middleName: 'Павлович',
          lastName: 'Соколов',
          groupId: 6,
          professionId: 1,
          email: 'sokolov28@example.com',
          phone: '+7 (915) 665-8425',
          birthday: '1971-04-19',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Алексей',
          middleName: 'Игоревич',
          lastName: 'Игнатьев',
          groupId: 7,
          professionId: 1,
          email: 'ignatiev29@example.com',
          phone: '+7 (953) 726-9840',
          birthday: '1962-03-08',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Сергей',
          middleName: 'Игоревич',
          lastName: 'Лебедев',
          groupId: 7,
          professionId: 1,
          email: 'lebedev30@example.com',
          phone: '+7 (950) 323-1179',
          birthday: '1962-01-18',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Наталья',
          middleName: 'Ивановна',
          lastName: 'Иванова',
          groupId: 3,
          professionId: 1,
          email: 'ivanova31@example.com',
          phone: '+7 (918) 404-7695',
          birthday: '1962-03-22',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Ольга',
          middleName: 'Александровна',
          lastName: 'Сидорова',
          groupId: 7,
          professionId: 2,
          email: 'sidorova32@example.com',
          phone: '+7 (927) 864-9243',
          birthday: '1974-11-04',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Дмитрий',
          middleName: 'Петрович',
          lastName: 'Игнатьев',
          groupId: 3,
          professionId: 1,
          email: 'ignatiev33@example.com',
          phone: '+7 (949) 466-4913',
          birthday: '1987-12-26',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Татьяна',
          middleName: 'Андреевна',
          lastName: 'Петрова',
          groupId: 10,
          professionId: 2,
          email: 'petrova34@example.com',
          phone: '+7 (915) 885-8176',
          birthday: '1983-03-14',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Анна',
          middleName: 'Александровна',
          lastName: 'Миронова',
          groupId: 5,
          professionId: 1,
          email: 'mironova35@example.com',
          phone: '+7 (964) 595-5238',
          birthday: '1981-09-11',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Андрей',
          middleName: 'Александрович',
          lastName: 'Игнатьев',
          groupId: 2,
          professionId: 1,
          email: 'ignatiev36@example.com',
          phone: '+7 (915) 683-8498',
          birthday: '1967-08-02',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Екатерина',
          middleName: 'Викторовна',
          lastName: 'Федорова',
          groupId: 3,
          professionId: 1,
          email: 'fedorova37@example.com',
          phone: '+7 (950) 631-3334',
          birthday: '1988-01-05',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Алексей',
          middleName: 'Павлович',
          lastName: 'Соколов',
          groupId: 9,
          professionId: 2,
          email: 'sokolov38@example.com',
          phone: '+7 (959) 733-3003',
          birthday: '1982-07-15',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Павел',
          middleName: 'Сергеевич',
          lastName: 'Игнатьев',
          groupId: 4,
          professionId: 1,
          email: 'ignatiev39@example.com',
          phone: '+7 (980) 217-6564',
          birthday: '1969-10-02',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Андрей',
          middleName: 'Павлович',
          lastName: 'Лебедев',
          groupId: 4,
          professionId: 1,
          email: 'lebedev40@example.com',
          phone: '+7 (991) 938-3359',
          birthday: '1981-05-14',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Сергей',
          middleName: 'Павлович',
          lastName: 'Кузнецов',
          groupId: 8,
          professionId: 2,
          email: 'kuznetsov41@example.com',
          phone: '+7 (917) 885-3821',
          birthday: '1986-06-17',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Мария',
          middleName: 'Александровна',
          lastName: 'Федорова',
          groupId: 4,
          professionId: 2,
          email: 'fedorova42@example.com',
          phone: '+7 (921) 188-9469',
          birthday: '1988-04-15',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Александр',
          middleName: 'Петрович',
          lastName: 'Лебедев',
          groupId: 1,
          professionId: 2,
          email: 'lebedev43@example.com',
          phone: '+7 (911) 397-9258',
          birthday: '1971-01-06',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Сергей',
          middleName: 'Иванович',
          lastName: 'Волков',
          groupId: 2,
          professionId: 2,
          email: 'volkov44@example.com',
          phone: '+7 (978) 376-5856',
          birthday: '1983-01-03',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Татьяна',
          middleName: 'Ивановна',
          lastName: 'Иванова',
          groupId: 7,
          professionId: 2,
          email: 'ivanova45@example.com',
          phone: '+7 (980) 186-1712',
          birthday: '1967-03-20',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Сергей',
          middleName: 'Александрович',
          lastName: 'Кузнецов',
          groupId: 6,
          professionId: 2,
          email: 'kuznetsov46@example.com',
          phone: '+7 (909) 183-7005',
          birthday: '1981-05-27',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Александр',
          middleName: 'Сергеевич',
          lastName: 'Игнатьев',
          groupId: 8,
          professionId: 1,
          email: 'ignatiev47@example.com',
          phone: '+7 (974) 823-9471',
          birthday: '1963-02-17',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Павел',
          middleName: 'Сергеевич',
          lastName: 'Игнатьев',
          groupId: 2,
          professionId: 1,
          email: 'ignatiev48@example.com',
          phone: '+7 (985) 124-3034',
          birthday: '1980-12-17',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Андрей',
          middleName: 'Иванович',
          lastName: 'Смирнов',
          groupId: 3,
          professionId: 1,
          email: 'smirnov49@example.com',
          phone: '+7 (965) 658-7877',
          birthday: '1975-03-11',
          photoUrl: 'https://i.pravatar.cc/300',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Employees', null, {});
  },
};
