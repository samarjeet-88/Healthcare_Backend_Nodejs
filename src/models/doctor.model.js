import mongoose,{Schema} from "mongoose";



const doctorSchema=new Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    }
})

export const Doctor=mongoose.model("Doctor",doctorSchema)