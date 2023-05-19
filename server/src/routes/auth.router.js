const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Employee, AuthInfo } = require('../../db/models');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Проверка ввода данных
  if (!email || !password) {
    return res.status(400).send({ message: 'Поле ввода не может быть пустым' });
  }

  try {
    // Проверка существования пользователя
    const user = await Employee.findOne({ where: { email } }, { raw: true });
    if (!user) {
      return res.status(400).send({ message: 'Пользователь не найден' });
    }

    // Проверка существования AuthInfo для пользователя
    const checkUser = await AuthInfo.findOne({ where: { userId: user.id } }, { raw: true });
    if (checkUser) {
      return res.status(200).send({ userId: user.id, groupId: user.groupId, professionId: user.professionId });
    }

    // Хеширование пароля и создание AuthInfo
    const hash = await bcrypt.hash(password, 10);
    const newPassword = await AuthInfo.create({
      userId: user.id,
      password: hash
    });

    // Проверка успешного создания AuthInfo
    if (!newPassword) {
      return res.status(500).send({ message: 'Не удалось создать учетные данные.' });
    }

    req.session.email = user.email;
    req.session.userId = user.id;
    return res.status(200).send({ userId: user.id, groupId: user.groupId, professionId: user.professionId });
    // Сохранение данных в сессию и отправка ответа
  } catch (error) {
    console.log('===> error', error);
    return res.status(500).send({ message: 'Ошибка сервера.' });
  }
});

module.exports = router;
