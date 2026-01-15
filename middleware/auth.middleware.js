const jwt = require("jsonwebtoken");

const secret = "iamrafiullah";

const authenticateToken = (req, res, next) => {
  try {
    console.log("=== DEBUG: Middleware triggered ===");
    console.log("Request headers:", req.headers);

    // Get token from header
    const authHeader = req.headers["authorization"];
    console.log("Authorization header:", authHeader);

    if (!authHeader) {
      console.log("DEBUG: No authorization header found");
      return res.status(401).send({
        isSuccess: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log(
      "Extracted token:",
      token ? "Token present" : "No token after split"
    );

    if (!token) {
      console.log("DEBUG: Token not found in header format");
      return res.status(401).send({
        isSuccess: false,
        message: "Access denied. Token missing.",
      });
    }

    // Verify token
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        console.log("DEBUG: Token verification failed:", err.message);
        return res.status(403).send({
          isSuccess: false,
          message: "Invalid or expired token.",
        });
      }

      console.log("DEBUG: Token verified successfully for user:", user);
      req.user = user;
      next();
    });
  } catch (error) {
    console.error("DEBUG: Middleware error:", error);
    res.status(500).send({
      isSuccess: false,
      message: "Internal server error",
    });
  }
};

module.exports = { authenticateToken };
