import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Check user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists. Please login!",
      });
    }

    // 2. Hash password
    const saltRounds = Number(process.env.SALT_ROUND) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Save user in DB
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // 4. Send response (NO PASSWORD)
    res.status(201).json({
      message: "User registered successfully!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration error!",
      error: error.message,
    });
  }
};