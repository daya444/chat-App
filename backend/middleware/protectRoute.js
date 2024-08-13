import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "Not authorized - no token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({ error: "Not authorized - invalid token" });
        }

        const user = await User.findById(decoded.userID).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log("Error in protect route middleware", err.message);
        res.status(401).json({ error: "Not authorized" });
    }
};
