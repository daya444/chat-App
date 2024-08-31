import express from "express";
import path from "path"; 
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

const __dirname = path.resolve()
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://chat-app-578p.onrender.com' // Your deployed frontend URL
        : 'http://localhost:8000', // Local development URL
    credentials: true,
};
app.use(cors(corsOptions));


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router);
app.use("/api/messages", sendMessage);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist"))); 

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
    connectToMongodb();
    console.log(`Server running on port ${PORT}`);
});
