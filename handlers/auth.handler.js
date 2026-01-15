const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// users [] memory base
const users = [];
let userId = 0; // INITIALIZE THIS

const secret = "iamrafiullah";

// Register handler
const registerHandler = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // validation
    if (!email || !password || !username) {
      return res.status(400).send({
        isSuccess: false,
        message: "inputs are required",
      });
    }

    // already user exist - FIXED ARROW FUNCTION
    const existUser = users.find(u => u.username === username || u.email === email);

    if (existUser) {
      return res.status(409).send({ 
        isSuccess: false, 
        message: "user already exist" 
      });
    }

    // make password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    userId = userId + 1; // INCREMENT userId
    const id = userId;

    const newUser = { 
      id, 
      username, 
      email, 
      password: hashedPassword 
    };

    // make token - jwt.sign is NOT async, no await needed
    const payload = {
      id: newUser.id,
      username,
      email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    users.push(newUser);

    res.status(201).send({
      isSuccess: true,
      message: "User registered successfully",
      token
    });
    
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send({
      isSuccess: false,
      message: "internal server error",
    });
  }
};

// Login handler
const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).send({
        isSuccess: false,
        message: "inputs are required",
      });
    }


    // Find user 
    const user = users.find(u => u.email === email);

    console.log("Found user:", user);

    if (!user) {
      return res.status(400).send({
        isSuccess: false,
        message: "Please register - user not found"
      });
    }

    // Check password - MUST use bcrypt.compare() NOT direct comparison
    const isPasswordMatch = await bcrypt.compare(password, user.password);


    if (!isPasswordMatch) {
      return res.status(400).send({
        isSuccess: false,
        message: "invalid password"
      });
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    // Give token to user - no await needed
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    res.status(200).send({
      isSuccess: true,
      message: "Login successful",
      token,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({
      isSuccess: false,
      message: "internal server error",
    });
  }
};

module.exports = { registerHandler, loginHandler };