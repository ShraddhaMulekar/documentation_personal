import crypto from "crypto";
import { UserModel } from "../../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
        success: false,
      });
    }

    // hash incoming token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // find user
    const user = await UserModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid or expired token", success: false });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUND),
    );

    user.password = hashedPassword;

    // clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password reset successful",
      success: true,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: "Reset password error",
      error: error.message,
      success: false,
    });
  }
};
