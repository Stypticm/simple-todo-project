const router = require("express").Router();
let Todo = require("../models/todo.model");

router.route("/").get((req, res) => {
  Todo.find()
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Todo.find({
    objId: req.params.id,
  })
    .then((todo) => res.json(todo))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add/:id").post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const date = req.body.date;
  const objId = req.params.id;

  const newTodo = new Todo({
    objId,
    title,
    description,
    date,
  });

  newTodo
    .save()
    .then(() => res.json("Todo added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json("Todo deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").put((req, res) => {
  Todo.findByIdAndUpdate(req.params.id)
    .then((todo) => {
      if (!todo) return res.status(404).json({message: 'Not found'});

      todo.title = req.body.title;
      todo.description = req.body.description;
      todo.date = Date.parse(req.body.date);
      todo.objId = req.body.objId;

      todo
        .save()
        .then(() => res.json("Todo updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
