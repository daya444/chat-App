import User from "../model/userModel.js";
import brcrypt from "bcryptjs"
import generateTokenAndSetCookies from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try{
        const{fullName,username,password,confirmPassword,gender} = req.body;

         if(password !== confirmPassword){
             return res.status(400).json({error : "Passwords do not match"});
         }


         const user= await User.findOne({username})

         if(user){
            return res.status(400).json({error : "User already exists"});
         }


            const salt = await brcrypt.genSalt(10);
            const hashedPassword = await brcrypt.hash(password, salt);


         const boyProfilePic= `https://avatar.iran.liara.run/public/boy?username=${username}`
         const girlProfilePic= `https://avatar.iran.liara.run/public/girl?username=${username}`


      const newUser = await User({

        fullName,
        username,
        password:hashedPassword,
        gender,
        profilePic:gender === "male" ? boyProfilePic :girlProfilePic
      })
     

      if (newUser){

        generateTokenAndSetCookies(newUser._id,res)

        await newUser.save();


      res.status(201).json({

        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      

      })

      }else {
        res.status(400).json({error: "Invalid user data"});
      }

      



  }catch(err){
    console.log("Error in signup controller",err.message);
    res.status(500).json({error: "Internal server error"});
  }
    
};






export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Username or password incorrect" });
        }

        const isPasswordCorrect = await brcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Username or password incorrect" });
        }

        generateTokenAndSetCookies(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (err) {
        console.log("Error in login controller", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const logout = (req, res) => {
    try {
        // Clear the JWT cookie by setting it with an expired date
        res.cookie("jwt", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
            expires: new Date(0), // Expire the cookie immediately
            path: '/' // Ensure this matches the path used when setting the cookie
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.error("Error in logout controller", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

