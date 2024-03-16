const Employee = require('../models/employeeModel');
const {CustomAPIError} = require('../errors');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' })

const doLogin = async (req, res, next) => {
    try {
      const { firstName,password} = req.body;
  
      let user = await Employee.findOne({ firstName: firstName });
  
      if (!user) {
        throw new CustomAPIError('Invalid Credentials(User does not exist)', 400);
      }
  
      if (user.password !== password) {
        throw new CustomAPIError('Invalid Credentials(Passwod incorrect)', 400);
      }
  
      const payload = {
        user: {
          id: user._id,
          companyId: user.cart
        }
      };

      const token = await jwt.sign(payload, process.env.SECRET, {
        expiresIn: '30d'
      });
      
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }

  module.exports = {
    doLogin
  }