const express = require("express");
const { sendEmail } = require("../controllers/emailController");

const router = express.Router();

// Route to send email
router.post("/contact/send-email", sendEmail);

module.exports = router;
