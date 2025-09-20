import { Doctor } from "../models/doctor.model.js";
import { User } from "../models/user.model.js";


const assignDoctor=async(req,res)=>{
    try{
        const user=req.user;
        const {doctorId,patientId}=req.body;
        if(!doctorId || !patientId){
            return res.status(400).json({msg:"Has to provide the id of the doctor and the id of the patient"})
        }

        const patient=user.patients.find((p)=>p.id==patientId);
        if(!patient){
            return res.status(400).json({msg:`You do not have a patient with Id ${patientId}`})
        }

        const doctor=await Doctor.findOne({id:doctorId});
        if(!doctor){
            return res.status(400).json({msg:`Doctor with Id ${doctorId} does not exist`})
        }
        patient.doctors.push(doctor._id)
        await user.save();
        return res.status(200).json({msg:"Doctor is assigned to the patient"})

    }catch(error){
        return res.status(500).json({msg:"Assign a doctor function failed",error:error})
    }
}

const allPatientDoctorMapping=async(req,res)=>{
    try{
        const user=req.user;
        
        const allPatientDoctorMapping=await Promise.all(user.patients.map(async(p)=>{
            const allDoctorData=await Promise.all(
                p.doctors.map(async(doctorId)=>{
                    const doctor=await Doctor.findById({_id:doctorId})
                    return doctor.name
                })
            )
            return {
                "Patient name":p.name,
                "Doctors Assigned":allDoctorData
            }
        }))
        return res.status(200).json({
            msg:"All patient doctor mapping",
            allPatientDoctorMapping
        })
    }catch(error){
        return res.status(500).json({msg:"Retrieve all patient doctor mapping function failed"})
    }
}

const specificPatientDoctorMapping=async(req,res)=>{
    try{
        const user=req.user;
        const {id}=req.params;

        const patientData=user.patients.find((p)=>p.id==id);
        
        if(!patientData){
            return res.status(400).json({msg:"Patient with this id does not exist"})
        }
        const allDoctor=await Promise.all(patientData.doctors.map(async(doctorId)=>{
            const doctorData=await Doctor.findById(doctorId)
            return doctorData.name
        }))
        return res.status(200).json({"Doctor assigned":allDoctor})

    }catch(error){
        return res.status(500).json({msg:"Specific doctor patient mapping function not working",error})
    }
}

const deletDoctorPatient=async(req,res)=>{
    try{
        const user=req.user;
        const {id}=req.params;
        const {doctorName}=req.body;


        if(!doctorName){
            return res.status(400).json({msg:"Please provide a doctors name"})
        }

        const specificPatient=user.patients.find((p)=>p.id==id);
        if(!specificPatient){
            return res.status(400).json({msg:"Patient with this id does not exist"})
        }
        const allDoctors=await Promise.all(specificPatient.doctors.map(async(doctorId)=>{
            const doctordata=await Doctor.findById(doctorId)
            return doctordata
        }))
        const doctorExist=allDoctors.find(doctor=>doctor.name==doctorName)
        if(!doctorExist){
            return res.status(400).json({msg:"Doctor of this name is not assigned to this patient"})
        }
        specificPatient.doctors.pull(doctorExist._id)
        await user.save()

        return res.status(200).json({msg:"Doctor is removed"})

    }catch(error){
        return res.status(500).json({msg:"Delete doctor patient function not working"})
    }
}

export {assignDoctor,allPatientDoctorMapping,specificPatientDoctorMapping,deletDoctorPatient}