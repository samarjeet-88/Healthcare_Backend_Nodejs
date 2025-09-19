import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT=async(req,res,next)=>{
    try{
        const token=req.cookies?.jwtToken;
 
        if(!token){
            res.status(400).msg({msg:"Token not present. Unauthorized access"})
        }

        const decodedToken=jwt.verify(token,process.env.TOKEN_SECRET);

        const user=await User.findById(decodedToken?._id).select("-password");

        if(!user){
            res.status(400).json({msg:"Token not valid"})
        }

        req.user=user;
        next()

    }catch(error){
        res.status(500).json({msg:"Verfication jwt function failed"})
    }
}