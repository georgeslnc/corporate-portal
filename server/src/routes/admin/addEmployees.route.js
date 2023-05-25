const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { Employee, Group, Profession } = require('../../../db/models');
const mailer = require('../../services/nodemailer.config');
const createMessage = require('../../services/nodemailer.sender.js');

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

      const message = createMessage(firstName, lastName, email);
      mailer(message);

      return res.json({ status: 200, message: 'Сотрудник успешно добавлен' });
    } catch (error) {
      console.error('===> error', error);
      return res.json({ status: 500, message: 'Ошибка сервера.' });
    }
  });

module.exports = router;
