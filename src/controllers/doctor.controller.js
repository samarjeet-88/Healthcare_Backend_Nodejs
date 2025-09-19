import { Doctor } from "../models/doctor.model.js";



const addNewDoctor=async(req,res)=>{
    try{
        const {doctorId,doctorName}=req.body;

        if(!doctorId || !doctorName){
            res.status(400).json({msg:"Doctor name and Doctor Id should be provided where the property are doctorName and doctorId"})
        }
        const alredyExist=await Doctor.findOne({id:doctorId})
        if(alredyExist){
            res.status(400).json({msg:"Doctor of this id already exist"})
        }
        const doctor=new Doctor({
            doctorId:doctorId,
            doctorName:doctorName
        })
        await doctor.save()

        res.status(200).json({msg:"Doctor created successfully"})
    }catch(error){
        res.status(500).json({msg:"Add new doctor controller not working",error})
    }
}


const getAllDoctors=async(req,res)=>{
    try{
        const allDoctors=await Doctor.find();

        const doctorsList=allDoctors.map((doc)=>({
            "Doctor Id":doc.id,
            "Doctor Name":doc.name
        }))
        res.status(200).json({"All doctors: ":doctorsList})
    }catch(error){
        res.status(500).json({msg:"Get Specific Doctor function failed",error})
    }
}


const getSpecificDoctor=async(req,res)=>{
    try{
        const {id}=req.params;

        const doctor=await Doctor.findOne({id:id})
        if(!doctor){
            res.status(400).json({msg:"Doctor of this id does not exist"})
        }
        res.status(200).json({doctor})
    }catch(error){
        res.status(500).json({msg:"Get Specific Doctor function failed",error})
    }
}

const updateSpecificDoctor=async(req,res)=>{
    try{
        const {name}=req.body;
        if(!name){
            res.status(400).json({msg:"New Doctor name should be provided"})
        }
        const {id}=req.params;
        const doctor=await Doctor.findOne({id:id});

        if(!doctor){
            res.status(400).json({msg:"Doctor of this id does not exist"})
        }
        doctor.name=name;
        await doctor.save();
        res.status(200).json({msg:"Doctor name updated succesfully"})
    }catch(error){
        res.status(500).json({msg:"Update specific Doctor function failed",error})
    }
}

const deleteSpecificDoctor=async(req,res)=>{
    try{
        const {id}=req.params;
        const doctor=await Doctor.findOne({id:id});

        if(!doctor){
            res.status(400).json({msg:"Doctor of this id does not exist"})
        }
        await Doctor.deleteOne({id:id})
        res.status(200).json({msg:"Doctor deleted succesfully"})
    }catch(error){
        res.status(500).json({msg:"Update specific Doctor function failed",error})
    }
}

export {addNewDoctor,getAllDoctors,getSpecificDoctor,updateSpecificDoctor,deleteSpecificDoctor}