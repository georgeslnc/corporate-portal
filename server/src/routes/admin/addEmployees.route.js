const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { Employee, Group, Profession } = require('../../../db/models');
const mailer = require('../../utils/nodemailer');

const phoneFormatter = require('../../utils/phoneFormatter');
const validateModel = require('../../utils/validateModel');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/');
  },
  filename(req, file, cb) {
    const extension = file && path.extname(file.originalname);
    cb(null, `photo-user-${Date.now()}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

router
  .post('/employees', upload.single('photo'), async (req, res) => {
    try {
      const {
        firstName, middleName, lastName, groupTitle, profession, email, phoneNumber, birthday
      } = req.body;

      const phone = phoneFormatter(phoneNumber);
      const photoUrl = req.file && process.env.BASE_URL + req.file.path.replace('public/', '');
      const groupId = await validateModel(Group, { title: groupTitle });
      const professionId = await validateModel(Profession, { position: profession });

      if (!groupId || !professionId) {
        return res.json({ status: 409, message: 'Отдел или профессия не найдены' });
      }

      const checkData = Object.values(req.body).every(Boolean);
      if (!checkData) {
        return res.json({ status: 400, message: 'Не все поля заполнены' });
      }

      const checkUser = await Employee.findOne({ where: { email } }, { raw: true });

      if (checkUser) {
        return res.json({ status: 400, message: 'Сотрудник с такими данными уже существует' });
      }

      const user = await Employee.create({
        firstName, middleName, lastName, groupId, professionId, email, phone, birthday, photoUrl
      });

      const message = {
        from: 'softmaster@internet.ru',
        to: 'msolonsky@icloud.com',
        subject: 'Корпоративный портал SoftMaster',
        html: `
            <h4 style="padding: 10px;background-color: #50526e;color: #fff;">Тема: Доступ в SoftMaster</h4>
            <h1 style="color: #3f4259">${firstName} ${lastName},</h1>
            <p style="padding:10px;background-color: #f8f9fa;color: #50526e;font-size:18px">Вам открыт доступ в Корпоративный портал.\n
            При первом входе по электронному адресу ${email} ваш пароль будет сохранен. \n
            Дальнейшая авторизация в портал будет осуществлена по нему.
            </p>
            <h3 style="color: #3f4259">С наилучшими пожеланиями, команда SoftMaster.</h3>
            <div style="color: var(--bs-gray); font-size: 14px; margin-top: 20px">email для обратной связи: softmaster@internet.ru</div>
      `,
      };

      mailer(message);

      return res.json({ status: 200, message: 'Сотрудник успешно добавлен' });
    } catch (error) {
      console.error('===> error', error);
      return res.json({ status: 500, message: 'Ошибка сервера.' });
    }
  });

module.exports = router;
