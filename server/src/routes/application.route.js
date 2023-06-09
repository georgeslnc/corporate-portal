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
      status: false,
    });
    res.json(result);
  } catch (err) {
    console.error(err);
  }
});

router.post('/status', async (req, res) => {
  try {
    const {
      id, user
    } = req.body;
    const result = await Offer.findByPk(id);
    await result.update({ status: true, employeesCloseId: user});
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
