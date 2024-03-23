const User = require("../models/userModel");
const Product = require("../models/productModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const getCartFromUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.id);
    const cartPromises = user.shoppingCart.map((item)=>{
      return Product.findById(item).then((product)=>product)
    })
    console.log(cartPromises)
    Promise.all(cartPromises).then((shoppingCart)=>{
      console.log(shoppingCart)
      res.status(200).json(shoppingCart);
    })
   
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.id).select(["userName","shoppingCart","role"]);
    const cartPromises = user.shoppingCart.map((item)=>{
      return Product.findById(item).then((product)=>product)
    })
    console.log(cartPromises)
    Promise.all(cartPromises).then((shoppingCart)=>{
      console.log(shoppingCart)
      let obj = {...(user._doc)}
      obj.shoppingCart = shoppingCart
      console.log(obj)
      res.status(200).json(obj);
    })
   
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);

    if (!user.userName || !user.password || !user.role) {
      return res.status(400).json({ message: "Bad Request" });
    }
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    
    const user = await User.findByIdAndUpdate(req.id, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getCartFromUser,
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
