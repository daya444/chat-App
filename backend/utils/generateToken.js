import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userID, res) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET_KEY, {
        expiresIn: "15d"
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // Ensures proper cross-site behavior
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    });
}

export default generateTokenAndSetCookies;
