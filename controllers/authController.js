import User from "../models/user";
import bcrypt from "bcryptjs";

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

export const login = async (req, res) => {};
