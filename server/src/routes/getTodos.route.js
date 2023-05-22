const router = require("express").Router();

const { Todo } = require("../../db/models");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allTodos = await Todo.findAll({ where: { employeeId: id } });
    const result = allTodos.map((el) => el.get({ plain: true }));
    res.json({
      result,
    });
  } catch (err) {
    console.error(err);
  }
});

router.delete("/deleteTodos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const curTodo = await Todo.findByPk(id);
    curTodo.destroy();
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

router.post("/newTodo", async (req, res) => {
  try {
    const { todo, time, employeeId } = req.body;
    const result = await Todo.create({
      todo,
      time,
      completed: false,
      employeeId,
    });
    res.json(result);
  } catch (err) {
    console.error(err);
  }
});

router.post("/editTodo", async (req, res) => {
  try {
    const { id, todo, time } = req.body;
    const curTodo = await Todo.findByPk(id);
    console.log(curTodo)
    curTodo.update({ todo, time });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

router.post("/statusTodo", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(">>>>>>>>>>>>", id)
    const curTodo = await Todo.findByPk(id);
    console.log(">>>>>>>>>>>",curTodo, curTodo.dataValues.completed)
    curTodo.update({ completed: !curTodo.dataValues.completed });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
