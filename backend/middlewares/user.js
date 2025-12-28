const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const middleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", authHeader);

  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authorization token missing"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED TOKEN:", decoded);

    
    if (!decoded.userId) {
      return res.status(401).json({
        message: "Invalid token payload"
      });
    }

   
    req.userId = decoded.userId;

  
    next();

  } catch (err) {
    console.error("JWT ERROR:", err.message);
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = middleware;
