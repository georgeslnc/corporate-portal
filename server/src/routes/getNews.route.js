const router = require('express').Router();
const { New } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const news = await New.findAll({ raw: true });
    console.log('<<<<<<<<', news);
    res.json(news);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
