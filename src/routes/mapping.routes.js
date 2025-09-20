import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJwt.middleware.js";
import { allPatientDoctorMapping, assignDoctor, deletDoctorPatient, specificPatientDoctorMapping } from "../controllers/mapping.controller.js";




const router=Router()

router.route('/mappings').post(verifyJWT,assignDoctor).get(verifyJWT,allPatientDoctorMapping)

router.route('/mappings/:id').get(verifyJWT,specificPatientDoctorMapping).delete(verifyJWT,deletDoctorPatient)

export default router