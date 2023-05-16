const router = require('express').Router();

const { Employee } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const allEmployees = await Employee.findAll({ raw: true });
    res.json(allEmployees);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
