import { UserModel } from "../../models/userModel.js";
import crypto from "crypto";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body || [];

    if(!email){
        return res.status(401).json({message:"Email is required!"})
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found. Please login now!", success: false });
    }

    // generate token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // hash token before saving
    const hashToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; //10 min

    await user.save();

    return res.status(200).json({
      message: "Reset token generated",
      resetToken, // send via email in real app
      success: true,
    });
  } catch (error) {
    // console.log({error})
    return res.status(500).json({
      message: "Forgot password error",
      error: error.message,
      success: false,
    });
  }
};