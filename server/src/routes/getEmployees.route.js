const router = require('express').Router();

const {
  Employee, Departament, Group, Profession,
} = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const allEmployees = await Employee.findAll({ raw: true });
    const allGroup = await Group.findAll({ raw: true });
    const allDepartment = await Departament.findAll({ raw: true });
    const allProfessions = await Profession.findAll({ raw: true });
    res.json({
      allEmployees, allGroup, allDepartment, allProfessions,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
