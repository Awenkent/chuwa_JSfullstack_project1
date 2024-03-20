const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  updateUser,
  getOneUser,
  getCartFromUser,
  deleteUser,
} = require("../controllers/userController");

const { doLogin } = require("../controllers/authController");

const auth = require("../middlewares/auth");

router.post("/signin", doLogin);
router.post("/signup", createUser);

router.put("/", auth, updateUser); // update user
router.delete("/", auth, deleteUser);

router.get("/cart", auth, getCartFromUser);
router.get("/profile", auth, getOneUser); //only for test at backend
router.get("/", getAllUsers); // only for test at backend

module.exports = router;
