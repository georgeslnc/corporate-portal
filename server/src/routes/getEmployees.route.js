const router = require("express").Router();

const {
  Employee,
  Departament,
  Group,
  Profession,
  Offer,
} = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const allEmployees = await Employee.findAll({ raw: true });
    const allGroup = await Group.findAll({ raw: true });
    const allDepartment = await Departament.findAll({ raw: true });
    const allProfessions = await Profession.findAll({ raw: true });
    const allOffer = await Offer.findAll({ raw: true });
    res.json({
      allEmployees,
      allGroup,
      allDepartment,
      allProfessions,
      allOffer,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;

router.get("/offer", async (req, res) => {
  try {
    const allOffer = await Offer.findAll({ raw: true });
    res.json({
      allOffer,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
