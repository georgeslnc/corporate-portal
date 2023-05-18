const router = require('express').Router();
const { Employee, AuthInfo } = require('../../../db/models');
const phoneHandler = require('../../utils/formHandlers');

router.post('/employees', async (req, res) => {
  const {
    firstName, middleName, lastName, groupId, professionId, email, phoneNumber,
  } = req.body;

  const phone = phoneHandler(phoneNumber);

  // todo: удалить заглушки
  const birthday = '1994-02-01';
  const photo = '/sada/asdas/logo.jpg';

  console.log('|______|  req.body;:', req.body);

  const fields = Object.keys(req.body);
  const checkData = fields.every((field) => req.body[field]);

  if (!checkData) {
    return res.status(400).send({ message: 'Не все поля заполнены' });
  }

  try {
    // Проверка существования пользователя
    const checkUser = await Employee.findOne({ where: { email } }, { raw: true });
    if (checkUser) {
      return res.status(400).send({ message: 'Сотрудник с такими данными уже существует' });
    }

    // Создание пользователя Employee
    const user = await Employee.create({
      firstName, middleName, lastName, groupId, professionId, email, phone, birthday, photo
    });

    if (user) {
      return res.status(200).send({ message: 'Сотрудник успешно создан' });
    }
  } catch (error) {
    console.error('===> error', error);
    return res.status(500).send({ message: 'Ошибка сервера.' });
  }
});

module.exports = router;
