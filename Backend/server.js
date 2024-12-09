const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
const fs = require("fs");
const path = require("path");
const emailRoutes = require("./routes/emailRoutes");

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // Create the directory if it doesn't exist
}

// config dot env file
dotenv.config();

//database call
connectDb();

//rest object
const app = express();

//middlewares

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://expense-management-system-mern-client.onrender.com",
      // "http://localhost:3000",
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Serve static files
app.use(express.static("public")); // Adjust this if your assets are in a different folder

//routes
app.use("/api/v1/users", require("./routes/userRoute"));
// app.use("/api/v1/users", require("./routes/expenseRoute"));
app.use("/api/v1/users", emailRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "build"))); // Adjust 'build' to your build folder

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//port
const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
