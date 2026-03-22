import { UserModel } from "../../models/userModel.js";

export const allUser = async (req, res) => {
  try {
    const user = await UserModel.find();
    return res.status(200).json({ message: "all users!", success: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in all user!", success: false, error });
  }
};