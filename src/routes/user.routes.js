import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { registerValidateUser } from "../middlewares/userValidate.middleware.js";

const router=Router()

router.route("/register").post(registerValidateUser,registerUser)

router.route("/login").post(loginUser)


export default router