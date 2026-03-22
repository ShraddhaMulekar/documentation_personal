import express from "express"
import { login } from "../controllers/auth/login.js"
import { logout } from "../controllers/auth/logout.js"
import { register } from "../controllers/auth/register.js"
import { forgotPassword } from "../controllers/auth/forgotPassword .js"
import { resetPassword } from "../controllers/auth/resetPassword .js"
import { allUser } from "../controllers/auth/allUser.js"

export const authRouter = express.Router()

authRouter.get("/users", allUser)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.post("/register", register)
authRouter.post("/forgot-password", forgotPassword)
authRouter.post("/reset-password/:token", resetPassword)