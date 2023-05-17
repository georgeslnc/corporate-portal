const router = require('express').Router();

const { Offer } = require('../../db/models');

router.post('/', async (req, res) => {
  try {
    const { title, groupId, deadline } = req.body;
    await Offer.create({
      title,
      groupId,
      employeesId: 1,
      deadline,
    });
    res.statusCode(200);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
