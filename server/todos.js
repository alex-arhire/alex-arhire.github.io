const express = require("express");
const todoRoutes = express.Router();
const Chance = require("chance");

const chance = new Chance();

let todos = Array.from({ length: 5 }, (_, i) => ({
  id: chance.guid(),
  description: chance.sentence({ words: 10 }),
  done: chance.bool(),
}));

todoRoutes.get("/", (req, res) => {
  res.send(todos);
});

todoRoutes.get("/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  const todo = todos.find(t => t.id === todoId);

  if (todo) {
    return res.send(todo);
  }
  return res.send("Not found");
});

todoRoutes.post("/", (req, res) => {
  const todo = {
    id: chance.guid(),
    description: req.body.description,
    done: false,
  };

  todos.push(todo);

  res.send(todo);
});

todoRoutes.patch("/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  const { description, done = false } = req.body;

  todos = todos.map(t => {
    if (t.id === todoId) {
      const d = description || t.description;
      return {
        ...t,
        done,
        description: d,
      };
    }
    return t;
  });

  res.send(todos.find(t => t.id == todoId));
});

todoRoutes.delete("/:todoId", (req, res) => {
  const todoId = req.params.todoId;

  todos = todos.filter(t => t.id != todoId);

  res.json({ todoId });
});

module.exports = todoRoutes;
