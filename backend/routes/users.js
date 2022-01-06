const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user.id))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const nickname = req.body.nickname;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({ nickname, email, password });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .then(() => res.json(newUser))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
