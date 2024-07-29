import User from "../model/userModel.js";

export const getUserForSideBar =async (req,res)=> {
try{

    const loggedInUserId = req.user._id;

    const filterUser = await User.find({_id :{$ne   :loggedInUserId}}).select("-password")

    res.status(200).json(filterUser) ;
}
catch(err){
    console.error("Error in getuser for side bar controller",err.message);
    res.status(500).json({error:"Internal Server error"})
}
}