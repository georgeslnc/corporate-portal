const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const fs = require('fs');
const { Document } = require('../../../db/models');

const storage = multer.diskStorage({
  destination (req, file, cb) {
    const userDirectory = 'fileStorage'; // create a directory named after the user
    fs.mkdirSync(userDirectory, { recursive: true }); // create the directory if it does not exist
    cb(null, userDirectory);
    // cb(null, `fileStorage/${req.session.user.id}`);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { file } = req;
    const { documentType } = req.body;

    const newFile = await Document.create({
      title: file.originalname,
      url: `fileStorage/${file.filename}`,
      documentType,
    });

    res.json(newFile);
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const allFiles = await Document.findAll({ raw: true });
    res.json(allFiles);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get('/download/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const file = await Document.findOne({ where: { id } });
    const filePath = `fileStorage/${file.title}`;

    res.download(filePath);
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong' });
  }
});

module.exports = router;
