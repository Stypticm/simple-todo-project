const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, "invalid email"],
    createIndexes: { unique: true },
  },
  password: { type: String, required: true },
});

// хэшируем пароль
userSchema.pre("save", async function save(next) {
  // хэшируем только если пароль был новым или изменен
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
