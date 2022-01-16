const router = require("express").Router();
const bcrypt = require("bcrypt");
let User = require("../models/user.model");

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/one/:email-:password", async (req, res) => {  
  const email = req.params.email;
  const password = req.params.password;

  const user = await User.findOne({ email: email });
  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      res.status(200).json({ message: "Valid password" });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user.id))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
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
