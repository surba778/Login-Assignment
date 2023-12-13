const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, "users.json");
const secretKey = "Secret-Key-123"; // Replace with your actual secret key

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   const loginFormPath = path.join(__dirname, "index.html");
//   res.sendFile(loginFormPath);
// });

// Function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign(user, secretKey, { expiresIn: "1h" });
};

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  jwt.verify(token, secretKey, (err, user) => {
    if (err)
      return res.status(403).json({ success: false, message: "Invalid token" });

    req.user = user;
    next();
  });
};

// Endpoint to handle user registration
app.post("/register", async (req, res) => {
  try {
    const userData = req.body;

    // Read existing data
    const data = await fs.readFile(dbPath, "utf-8");
    const users = JSON.parse(data);

    const user = users.find(
      (u) => u.username === userData.username
    );
    if (user) {
      res.json({ success: false, message: "User already registered", });
      return
    }

    const uuid = uuidv4();
    userData['userId'] = uuid
    const d = new Date();
    userData['registeredAt'] = d.toISOString()
    // Add new user
    users.push(userData);

    // Write updated data back to the file
    await fs.writeFile(dbPath, JSON.stringify(users, null, 2));

    const token = generateToken(userData);

    res.json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Endpoint to handle user login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Read existing data
    const data = await fs.readFile(dbPath, "utf-8");
    const users = JSON.parse(data);

    // Check if user exists
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const token = generateToken(user);
      res.json({ success: true, message: "Login successful", token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Protected endpoint - example
app.get("/profile", authenticateToken, (req, res) => {
  res.json({ success: true, message: "Protected endpoint", user: req.user });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
