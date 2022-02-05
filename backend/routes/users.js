const router = require("express").Router();
const bcrypt = require("bcrypt");
// const uuid = require("uuid").v4;
// const session = require("express-session");
const User = require("../models/user.model");

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/one/:email-:password", async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;

  const user = await User.findOne({ email: email });
  try {
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        res.status(200).json({ message: "Valid password", user });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  } catch (err) {
    res.send(err);
  }
});

router.post("/add", async (req, res) => {
  const nickname = req.body.nickname;
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });

  if (user) {
    res.status(409).json({ Error: "Email already exist" });
  } else if (email === "") {
    res.status(204).json({ Error: "No content" });
  } else {
    const newUser = new User({ nickname, email, password });

    newUser
      .save()
      .then(() => res.json({message: "User added!", newUser}))
      .then(() => res.json(newUser))
      .catch((err) => res.status(400).json("Error: " + err));
  }
});

module.exports = router;
