import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "user not found. Please Log in now!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await UserModel.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in auth middleware!", error });
  }
};