const express = require("express");
const {expenseRegisterController, expenseGetController} = require("../controllers/expenseController");
const bodyParser = require("body-parser");

// Router object
const router = express.Router();

// Middleware for parsing JSON and URL-encoded data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));



module.exports = router;