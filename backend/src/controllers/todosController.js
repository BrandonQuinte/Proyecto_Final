const Todo = require("../models/todoModel");

exports.list = async (req, res) => {
  const todos = await Todo.findAll({ order: [["created_at", "DESC"]] });
  res.json(todos);
};

exports.create = async (req, res) => {
  if (!req.body.title)
    return res.status(400).json({ error: "title required" });

  const todo = await Todo.create(req.body);
  res.status(201).json(todo);
};

exports.update = async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);

  if (!todo) return res.status(404).json({ error: "not found" });

  await todo.update(req.body);
  res.json(todo);
};

exports.remove = async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);

  if (!todo) return res.status(404).json({ error: "not found" });

  await todo.destroy();
  res.sendStatus(204);
};
