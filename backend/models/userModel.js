const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//custom static signup method

userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("ყველაფერი შეავსეთ");
  }

  if (!validator.isEmail(email)) {
    throw Error("ასეთი იმეილი არ არსებობს");
  }
  if (
    !validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
  ) {
    throw Error("პაროლი სუსტია");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("იმეილი უკვე გამოყენებულია");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

//custom static login method

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("შევასეთ ყველაფერი");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("არასწორი ინფო");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("არასწორი ინფო");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
