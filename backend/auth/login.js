import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(500).json({ message: "User not found!" });
  }

  try {
    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Password!", err });
      } else if (result) {
        // payload
        const payload = {
          id: user._id,
          name: user.name,
        };
        // token generate
        const token = jwt.sign(payload, process.env.JWT_SECREATE_KEY, {
          expiresIn: "7d",
        });
        res.status(200).json({ message: "Login sucessful!", token, user });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "log in error!", error });
  }
};
