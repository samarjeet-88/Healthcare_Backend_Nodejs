import { User } from "../models/user.model.js";
import { genrateJwtToken } from "../utils/genrateJwtToken.js";



const registerUser=async(req,res)=>{
    try{
        
        const {username,email,password}=req.body;
        
        //CHECKING IS A USER EXISTS WITH THE SAME EMAIL
        const existedUser=await User.findOne({email});
        if(existedUser){
            res.status(409).json({msg:"User with the same email already exist"})
        }
        
        const user=await User.create({
            username,
            email,
            password
        })

        res.status(200).json({msg:"User registration successful"})
    }catch(error){
        res.status(500).json({"ERROR":"REGISTER USER FUNCTION NOT WORKING",error})
    }
}


const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        
        if(!email || !password){
            res.status(400).json({msg:"Both email and password is required for logging in"})
        }

        const user=await User.findOne({email:email});

        if(!user){
            res.status(400).send({msg:"Login failed. User with this email does not exist"})
        }

        const isPasswordValid=await user.isPasswordCorrect(password);
        if(!isPasswordValid){
            res.status(400).json({msg:"Login failed. Password Invalid"})
        }

        const jwtToken=genrateJwtToken(user);

        //set this token in the local storage of the frontend, can also set this in the cookie
        // res.status(200).json({
        //     msg:"Login Successful and also jwt token set",
        //     JWTtoken:jwtToken
        // })

        const options={
            httpOnly:true,
            secure:true
        }
        res.status(200)
        .cookie("jwtToken",jwtToken,options)
        .json({msg:"User logged in successfuly"})
        
    }catch(error){
        res.status(500).json({"ERROR":"LOGIN USER FUNCTION NOT WORKING",error})
    }
}


export {registerUser,loginUser}