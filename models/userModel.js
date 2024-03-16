const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  Role: {
    type: String,
    default: "Regular",
    required: true
  },
  shoppingCart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
},{ collection : 'USER' });

const User = mongoose.model('USER', userSchema);
module.exports = User;