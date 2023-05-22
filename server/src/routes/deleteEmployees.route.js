const router = require('express').Router();
const { Employee } = require('../../db/models');

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.destroy({
      where: { id }
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
