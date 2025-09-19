import jwt from "jsonwebtoken"

function genrateJwtToken(user){
    return jwt.sign(
        {
            _id:user._id,
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn:process.env.TOKEN_EXPIRY
        }
    )
}

export {genrateJwtToken}