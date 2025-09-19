import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJwt.middleware.js";
import { addNewPatient, deleteSpecificPatient, getAllPatients, getSpecificPatient, updateSpecificPatient } from "../controllers/patient.controller.js";


const router=Router();

router.route('/patients').post(verifyJWT,addNewPatient).get(verifyJWT,getAllPatients)

router.route('/patients/:id').get(verifyJWT,getSpecificPatient).put(verifyJWT,updateSpecificPatient).delete(verifyJWT,deleteSpecificPatient)


export default router