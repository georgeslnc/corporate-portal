const router = require('express').Router();

const { Offer } = require('../../db/models');

router.post('/', async (req, res) => {
  try {
    const {
      title, groupId, employeesId, deadline
    } = req.body;
    const result = await Offer.create({
      title,
      groupId: Number(groupId),
      employeesId: Number(employeesId),
      deadline,
    });
    res.json(result);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
