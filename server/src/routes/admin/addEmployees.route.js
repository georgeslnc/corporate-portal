const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const { Employee, Group, Profession } = require('../../../db/models');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/user-photo');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
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

/*

#
#
#
#
#
*/

const phoneFormatter = require('../../utils/phoneFormatter');
const validateModel = require('../../utils/validateModel');

router.post('/employees', upload.single('photo'), async (req, res) => {
  try {
    const {
      firstName, middleName, lastName, groupTitle, profession, email, phoneNumber, birthday
    } = req.body;

    const phone = phoneFormatter(phoneNumber);
    // const photoUrl = 'https://i.pravatar.cc/300'; //*  удалить заглушку
    const photoUrl = req.file.path;

    const groupId = await validateModel(Group, { title: groupTitle });
    const professionId = await validateModel(Profession, { position: profession });
    if (!groupId || !professionId) {
      return res.status(400).send({ message: 'Отдел или профессия не найдены' });
    }

    const checkData = Object.values(req.body).every(Boolean);
    if (!checkData) {
      return res.status(400).send({ message: 'Не все поля заполнены' });
    }

    const checkUser = await Employee.findOne({ where: { email } }, { raw: true });

    if (checkUser) {
      return res.status(400).send({ message: 'Сотрудник с такими данными уже существует' });
    }

    const user = await Employee.create({
      firstName, middleName, lastName, groupId, professionId, email, phone, birthday, photoUrl
    });

    return res.status(200).send({ message: 'Сотрудник успешно создан' });
  } catch (error) {
    console.error('===> error', error);
    return res.status(500).send({ message: 'Ошибка сервера.' });
  }
});

module.exports = router;
