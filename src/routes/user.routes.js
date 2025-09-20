import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { registerValidateUser } from "../middlewares/userValidate.middleware.js";
import { loginUserValidate } from "../middlewares/userLoginValidate.middleware.js";

const router=Router()

router.route("/register").post(registerValidateUser,registerUser)

router.route("/login").post(loginUserValidate,loginUser)


export default router