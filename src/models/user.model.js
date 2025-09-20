import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const patientSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:[true,"Patient of this id already exist"]
    },
    name:{
        type:String,
        required:true
    },
    doctors:{
        type:[{type:Schema.Types.ObjectId,ref:"Doctor"}],
        default:[]
    }
})

const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        //HOW TO USE THIS ERROR MESSAGE
        password:{
            type:String,
            required:[true,"PASSWORD IS REQUIRED"]
        },
        patients:{
            type:[patientSchema],
            default:[]
        }
    }
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10)
    next()
})


userSchema.methods.isPasswordCorrect=async function(password){
    // console.log(password)
    // console.log(this.password)
    try{
        const result=await bcrypt.compare(password,this.password)
        // console.log(result)
        return result

    }catch(error){
        console.log("bcrypt compare error",error)
    }
}



export const User=mongoose.model("User",userSchema)