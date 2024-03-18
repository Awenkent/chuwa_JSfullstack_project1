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

router.post("/password", auth, updateUser); // use update User to update the Cart
router.post("/cart", auth, updateUser); // use update User to update the Cart
router.delete("/", auth, deleteUser); // use update User to update the Cart

router.get("/cart", auth, getCartFromUser);
router.get("/profile", auth, getOneUser); //only for test at backend
router.get("/getAll", getAllUsers); // only for test at backend

module.exports = router;
