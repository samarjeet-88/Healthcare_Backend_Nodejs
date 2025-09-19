import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJwt.middleware.js";
import { addNewDoctor, deleteSpecificDoctor, getAllDoctors, getSpecificDoctor, updateSpecificDoctor } from "../controllers/doctor.controller.js";



const router=Router()

router.route("/doctors").post(verifyJWT,addNewDoctor).get(verifyJWT,getAllDoctors)

router.route('/doctors/:id').get(getSpecificDoctor).put(updateSpecificDoctor).delete(deleteSpecificDoctor)

export default router