import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";



import router from "./routes/auth-routes.js";
import sendMessage from "./routes/message-routes.js";
import userRoutes from "./routes/userRoutes.js";

import connectToMongodb from "./db/connectToMongoDb.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


app.use(express.json()); 
app.use(cookieParser());

app.use("/api/auth",router)
app.use("/api/messages",sendMessage)
app.use("/api/users",userRoutes)




app.listen(PORT, () => {
    connectToMongodb();
    console.log(`Server running on port ${PORT}`);
});
