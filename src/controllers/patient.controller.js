import { User } from "../models/user.model.js";



const addNewPatient=async(req,res)=>{
    try{

        const {patientId,patientName}=req.body;
        const user=req.user;

        if(!patientName || !patientId){
            return res.status(400).json({msg:"Patient name and patient Id should be provided where the property are patientName and patientId"})
        }

        const patientList=user.patients;
        const alreadyPresent=patientList.filter((p)=>p.id==patientId)
        // console.log(alreadyPresent)
        if(alreadyPresent.length>0){
            return res.status(400).json({msg:"Patient of this id already exists"})
        }

        user.patients.push({name:patientName,id:patientId});
        await user.save()

        return res.status(200).json({msg:"Added a new Patient"})

    }catch(error){
        return res.status(500).json({msg:"Add new patient controller not working",error})
    }
}

const getAllPatients=async(req,res)=>{
    try{
        const user=req.user;

        const patients=user.patients

        const patientList=patients.map((patient)=>({
            "Patient Id":patient.id,
            "Patient Name":patient.name
        }));
        return res.status(200).json({patients:patientList})
    }catch(error){
        return res.status(500).json({msg:"Failed to fetch all the patients",error})
    }
}

const getSpecificPatient=async(req,res)=>{
    try{
        const user=req.user;
        const {id}=req.params;
        
        const patientList=user.patients
        const specificPatient=patientList.find(p=>p.id==id);
        if(!specificPatient){
            return res.status(400).json({msg:"Patient of this id does not exist"});
        }

        const {_id,...patientWithoutId}=specificPatient.toObject()
        return res.status(200).json({"Patient":patientWithoutId})
    }catch(error){
        return res.status(500).json({msg:"Get Specific function failed",error})
    }
}

const updateSpecificPatient=async(req,res)=>{
    try{
        const {name}=req.body;
        if(!name){
            return res.status(400).json({msg:"Patient name must be prvided wiht the field as name"})
        }
        const user=req.user;
        const {id}=req.params;

        const patientList=user.patients;
        
        const specificPatient=patientList.find((p)=>p.id==id);
        if(!specificPatient){
            res.status(400).json({msg:"Patient of this id does not exist"})
        }
        specificPatient.name=name;

        await user.save();
        res.status(200).json({msg:"Patient updated successfully"})
    }catch(error){
        res.status(500).json({msg:"Update specific function failed",error})
    }
}

const deleteSpecificPatient=async(req,res)=>{
    try{
        const user=req.user;
        const {id}=req.params;

        const patientList=user.patients;
        const specificPatient=patientList.find((p)=>p.id==id);
        if(!specificPatient){
            return res.status(400).json({msg:"Patient of this id does not exist"})
        }
        
        user.patients.pull(specificPatient._id);
        await user.save();
        return res.status(200).json({msg:"Patient deleted successfully"})
    }catch(error){
        return res.status(500).json({msg:"Delete specific function failed",error})
    }
}

export {addNewPatient,getAllPatients,getSpecificPatient,updateSpecificPatient,deleteSpecificPatient}