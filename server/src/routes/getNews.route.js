const router = require('express').Router();
const { News } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const news = await News.findAll();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении новостей' });
  }
});

module.exports = router;
