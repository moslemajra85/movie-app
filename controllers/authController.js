import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // extract user data from req.body
  const { name, email, password } = req.body;

  // check if we have a user with the provided email

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ error: "User already exist" });
  }

  // create a salt

  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  // create and save a user

  user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  res.status(201).json({ message: "User created successfully" });
};

export const login = async (req, res) => {
  try {
    // extract email and password from req.body

    const { email, password } = req.body;

    // check if we have a user with the provided email

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Bad credentials" });
    }

    // check if the password is correct

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({ error: "Bad credentials" });
    }

    // generate a token

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // send the token

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
