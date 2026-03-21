import bcrypt from "bcrypt";
import { UserModel } from "../../models/userModel.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body || [];

  if (!name || !email || !password) {
    return res
      .status(401)
      .json({ message: "Name, Email, Password are required!", success: false });
  }

  //password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must have uppercase, lowercase, number, special character and minimum at least 6 character",
      success: false,
    });
  }

  try {
    // 1. Check user exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        message: "User already exists. Please login!",
        success: false,
      });
    }

    // 2. Hash password
    const saltRounds = Number(process.env.SALT_ROUND) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Save user in DB
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // 4. Send response (NO PASSWORD)
    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Registration error!",
      error: error.message,
      success: false,
    });
  }
};
