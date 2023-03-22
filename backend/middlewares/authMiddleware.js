//middleware for accepting token from user and give him acess to his notes
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // console.log(req.headers.authorization)  //token of user  will get console logged
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //  split will turn it into array where token is [1] and bearer is [2]
      token = req.headers.authorization.split(" ")[1]; //will return only token[1] not bearer

      // decoding  got token  from user
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // find user from dbase by decoded-id from token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized,token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized,no token");
  }
});

module.exports = { protect };
