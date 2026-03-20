import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User not found!",
      });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password!",
      });
    }

    // 3. Create payload
    const payload = {
      id: user._id,
      name: user.name,
    };

    // 4. Generate token
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    // 5. Send response (NO password)
    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Login error!",
      error: error.message,
    });
  }
};