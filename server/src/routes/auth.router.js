const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Employee, AuthInfo } = require('../../db/models');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({ message: 'Поле ввода не может быть пустым' });
  }
  try {
    const user = await Employee.findOne({ where: { email } }, { raw: true });
    console.log('|______|  user:', user);
    const sessionInfo = () => {
      req.session.email = user.email;
      req.session.userId = user.id;
      // req.session.save(() => res.redirect('/'));
    };
    const hash = await bcrypt.hash(password, 10);
    if (user) {
      const checkUser = await AuthInfo.findOne({ where: { userId: user.id } }, { raw: true });
      if (checkUser) {
        console.log('===============>');
        return res.send({ message: 'Вы уже зарегистрированы! Входите и вводите пароль :)' });
      }
      const newPassword = await AuthInfo.create({
        userId: user.id,
        password: hash
      });
      if (newPassword) {
        sessionInfo();
      }

      return res.status(200).send();
    }
  } catch (error) {
    console.log('===> error', error);
    return res.status(500).send({ message: 'Ошибка сервера.' });
  }
});

module.exports = router;
