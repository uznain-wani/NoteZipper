const asyncHandler = require("express-async-handler"); //handles errors
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

//route for registering new user and giving him his token
//POST request to /api/users
//public route
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error(" User Already Exists!");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    //if user is created successfully return him this
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

module.exports = { registerUser };

//route for authenticating the user and accepting his token and log him in
//POST request to /api/users/login
//public route for taking details from user of username nad password and checking it out from dbase  for logging him in

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id), //user can use this token  to acess protected routes like his profile
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});
// getting user profile via his token when he logs in
//GET request for /api/users/profile
//private route
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    if (user) {
      (user.name = req.body.name || user.name),
        (user.email = req.body.email || user.email);
      user.pic = req.body.pic || user.pic;

      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        pic: updatedUser.pic,
        token: generateToken(updatedUser._id),
      });
    }
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

module.exports = { registerUser, authUser, updateUserProfile };
