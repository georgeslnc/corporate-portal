// controllers/authController.js
const bcrypt = require('bcrypt');
const { Employee, AuthInfo } = require('../../db/models');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Проверка ввода данных
  if (!email || !password) {
    return res.status(400).send({
      message: { title: 'Неправильно заполнение', message: 'Поле ввода не может быть пустым' },
    });
  }

  try {
    // Проверка существования пользователя
    const user = await Employee.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ message: { title: 'Ошибка входа', message: 'Пользователь не найден' } });
    }

    // Проверка существования AuthInfo для пользователя
    const checkUserAuth = await AuthInfo.findOne({ where: { userId: user.id } });
    const { id, groupId, professionId } = user;

    if (checkUserAuth) {
      const match = await bcrypt.compare(password, checkUserAuth.password);

      if (match) {
        req.session.userId = id;
        req.session.professionId = professionId;
        const userData = { userId: id, groupId, professionId };
        if (professionId === 5) {
          userData.admin = true;
          req.session.admin = true;
        }

        return res.status(200).send({
          userData,
          message: { title: 'Успешный вход!', message: 'Добро пожаловать в корпоративный портал' },
        });
      }
      return res.status(401).send({
        message: { title: 'Ошибка входа', message: 'Неправильный пароль' },
      });
    }

    // Хеширование пароля и создание AuthInfo
    if (user && !checkUserAuth) {
      const hash = await bcrypt.hash(password, 10);
      const newPassword = await AuthInfo.create({
        userId: id,
        password: hash,
      });

      // Проверка успешного создания AuthInfo
      if (!newPassword) {
        return res
          .status(500)
          .send({ message: { title: 'Ошибка входа', message: 'Не удалось создать учетные данные.' } });
      }

      // Сохранение данных в сессию и отправка ответа
      req.session.userId = id;
      req.session.professionId = professionId;
      const userData = { userId: id, groupId, professionId };
      if (professionId === 5) {
        userData.admin = true;
        req.session.admin = true;
      }

      return res.status(200).send({
        userData,
        message: { title: 'Успешный вход!', message: 'Добро пожаловать в корпоративный портал' },
      });
    }
  } catch (error) {
    console.log('error', error);
    return res
      .status(500)
      .send({ message: { title: 'Ошибка сервера.', message: 'Попробуйте повторить попытку.' } });
  }
};

module.exports = {
  loginUser,
};
