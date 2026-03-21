import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/userModel.js";

export const login = async (req, res) => {
  const { email, password } = req.body || [];

  if(!email || !password){
    return res.status(401).json({message:"Email & Password both are required!"})
  }

  try {
    // 1. Check user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Email Id not found. Please Register now!",
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
    return res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: "Login error!",
      error: error.message,
    });
  }
};