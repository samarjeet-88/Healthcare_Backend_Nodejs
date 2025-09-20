import {z} from "zod"

const registerSchema=z.object({
    username:z.string().min(5,{message:"Username must be atleast 5 characters long"}),
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(5,{message:"Password must be atleast 6 characters long"})
})


export const registerValidateUser=(req,res,next)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
            return res.status(400).json({msg:"Username, email and password is compulsory for registering"})
        }
    const result=registerSchema.safeParse(req.body);

    if(!result.success){
       const errors=result.error.issues.map(err=>({
        field:err.path.join('.'),
        msg:err.message,
       }));
        return res.status(400).json({
            msg:"Validation failed",
            errors:errors,
        })    
    }
    next()
}