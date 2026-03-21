import express from "express"
import { login } from "../controllers/auth/login.js"
import { logout } from "../controllers/auth/logout.js"
import { register } from "../controllers/auth/register.js"
import { forgotPassword } from "../controllers/auth/forgotPassword .js"
import { resetPassword } from "../controllers/auth/resetPassword .js"

export const userRouter = express.Router()

userRouter.post("/login", login)
userRouter.post("/logout", logout)
userRouter.post("/register", register)
userRouter.post("/forgot-password", forgotPassword)
userRouter.post("/reset-password/:token", resetPassword)