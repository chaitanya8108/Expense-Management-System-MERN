const express = require("express");
const multer = require("multer");
const path = require("path");
const { verifyToken } = require("../middleware/authMiddleware");
const bodyParser = require("body-parser");
const {
  loginController,
  registerController,
  uploadAvatar,
  expenseGetController,
  expenseRegisterController,
  getUserController,
  expenseDeleteController,
  deleteAllExpensesController,
  searchExpensesByExpenseName,
  editExpenseController,
} = require("../controllers/userController");

// Router object
const router = express.Router();

// Middleware for parsing JSON and URL-encoded data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Use absolute path
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// Routes

// POST || LOGIN USER
router.post("/login", loginController);

// POST || REGISTER USER
router.post("/register", registerController);

//GET USER
router.get("/:userId", getUserController);

// POST || UPLOAD AVATAR
router.post("/upload-avatar", upload.single("avatar"), uploadAvatar);

// POST || REGISTER EXPENSE
router.post("/add-expense", expenseRegisterController);

// GET || FETCH EXPENSE
router.get("/expense/:expenseId", expenseGetController);

// DELETE || DELETE EXPENSE
router.delete("/expense/:expenseId", expenseDeleteController);

// DELETE || DELETE ALL EXPENSES
router.delete("/expense/deleteAll/:userId", deleteAllExpensesController);

// Search expenses by name (GET request)
router.get("/:userId/expenses", searchExpensesByExpenseName);

// Edit expenses by name (PUT request)
router.put("/expense/:expenseId", editExpenseController);

// Example protected route
router.get("/profile", verifyToken, (req, res) => {
  // If the request reaches here, the user is authenticated
  res.json({ msg: "This is your profile data", user: req.user });
});

module.exports = router;
