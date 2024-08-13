import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./routes/auth-routes.js";
import sendMessage from "./routes/message-routes.js";
import userRoutes from "./routes/userRoutes.js";
import connectToMongodb from "./db/connectToMongoDb.js";
import { app, server } from "./socket/socket.js";

dotenv.config();



const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true, // This allows cookies to be sent
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router);
app.use("/api/messages", sendMessage);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
    connectToMongodb();
    console.log(`Server running on port ${PORT}`);
});
