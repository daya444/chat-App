import jwt from "jsonwebtoken"


const generateTokenAndSetCookies= (userID,res)=> {
    const token = jwt.sign ({userID},process.env.JWT_SECRET_KEY,{
        expiresIn :"15d"
    })

    res.cookie("jwt",token,{
        maxAge : 15 * 24 * 60 * 60 *1000 ,
        httpOnly : true,
        sameSite : "strict",
    })
}

export default generateTokenAndSetCookies