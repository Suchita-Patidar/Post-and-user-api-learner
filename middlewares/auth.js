import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
const jwt_secret = process.env.SECRET_KEY;
export default{ 
  authenticate : (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({ message: "Token is required" });
  }
  try {
    const token = authHeader.split(" ")[1];
    // console.log('token',token)
    const decode = jwt.verify(token, jwt_secret);
    req.user = {
      userId: decode.userId,
      name: decode.name,
      role: decode.role,
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
}
}
