import {z} from "zod"

const loginSchema=z.object({
    email:z.string().email({message:"Must be a valid email"}),
    password:z.string({message:"Password must be a string"})
})

export const loginUserValidate=(req,res,next)=>{
    const result=loginSchema.safeParse(req.body);
    if(!result.success){
        const errorlist=result.error.issues.map((err)=>({
            "Field":err.path.join('.'),
            "Error Message":err.message
        }))

        return res.status(400).json({message:"Login Failed","errors":errorlist})
    }
    next()
}