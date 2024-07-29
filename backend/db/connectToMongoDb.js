import mongoose from "mongoose";


 const connectToMongodb =async ()=> {

    try {

        mongoose.connect(process.env.MONOGO_DP_URL);
        console.log("connected to mongoDB")

    }catch(err) {
        console.log("error correction",err.message)
    }

}

export default connectToMongodb