import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { generateToken, generateResetToken } from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import {google} from 'googleapis';




//auth user and get token
// POST /api/users/login
// public

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      googleId:user.googleId,
      email: user.email,
      isAdmin: user.isAdmin,
      isCal: user.isCal,
      isReader: user.isReader,
      isCommitmentAdmin:user.isCommitmentAdmin,
      isTrainer:user.isTrainer,
      isTechAdmin:user.isTechAdmin,
      isCounselor:user.isCounselor,
      isAcademic:user.isAcademic,
      address: user.address,
      profession: user.profession,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      address: user.address,
      isCal: user.isCal,
      isReader: user.isReader,
      isTrainer:user.isTrainer,
      isCommitmentAdmin:user.isCommitmentAdmin,
      isTechAdmin:user.isTechAdmin,
      isCounselor:user.isCounselor,
      isAcademic:user.isAcademic,
      profession: user.profession,
      googleId:user.googleId,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.profession = req.body.profession || user.profession;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isCal: updatedUser.isCal,
      isReader: updatedUser.isReader,
      isCommitmentAdmin:user.isCommitmentAdmin,
      isTrainer:user.isTrainer,
      isTechAdmin:user.isTechAdmin,
      isCounselor:user.isCounselor,
      isAcademic:user.isAcademic,
      address: updatedUser.address,
      profession: updatedUser.profession,
      googleId:user.googleId,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//creates a new user
// POST /api/users
// public

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, address, profession, password } = req.body;

  const userExits = await User.findOne({ email });

  if (userExits) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    address,
    profession,
  });
  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      address: user.address,
      profession: user.profession,
      isCommitmentAdmin:user.isCommitmentAdmin,
      isTechAdmin:user.isTechAdmin,
      isCounselor:user.isCounselor,
      isAcademic:user.isAcademic,
      isCal: user.isCal,
      isReader: user.isCal,
      isTrainer:user.isTrainer,
      googleId:user.googleId,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    res.json("invalid user dqta");
  }
});

// @desc    forgot password profile
// @route   POST /api/users/forgot
// @access  Public

export const forgotPasswordMail = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("No user with that email");
  }
  if (user.googleId){
    res.status(401)
    throw new Error("You have used google sign in")
  }
 /* const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI)
  oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})
  const accessToken= await oAuth2Client.getAccessToken()
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type:'OAuth2',
      user:'hsolanki1884@gmail.com',
      clientId:process.env.CLIENT_ID,
      clientSecret:process.env.CLIENT_SECRET,
      refreshToken:process.env.REFRESH_TOKEN,
      accessToken:accessToken
    },
  });
*/
console.log("before transporter")
let transporter=nodemailer.createTransport({
  service:"Godaddy",
  host: "smtpout.secureserver.net", 
  secureConnection: true,
  port: 465,

  auth:{
    user:process.env.MAIL_ID,
    pass:process.env.MAIL_PASSWORD

  }
})
  const token = generateResetToken(user._id);

  console.log("Here before send mail")

  let info = await transporter.sendMail({
    from: "Info@csmind.in", // sender address
    to: user.email, // list of receivers
    subject: "CSMIND Reset Password", // Subject line
    text: `Here is the link to reset your password it will be valid only for 1 hour  http://localhost:3000/resetpassword/${token}`, // plain text body
  });

  console.log("after mail send")
  if (info) {
    res.json({
      message: "email has been sent to your mail id",
      info,
    });
  } else {
    res.status(500);
    throw new Error("server error could not send your reset mail");
  }
});

// @desc    update user password
// @route   PUT /api/users/resetpassword
// @access  Private
export const updateUserPassword = asyncHandler(async (req, res) => {
  let token = req.body.resetToken;
  let decoded;
  if (token) {
    decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
  } else {
    res.status(400);
    throw new Error(
      "not authorized to change the password,no token is present"
    );
  }
  const user = await User.findById(decoded.id);

  if (user) {
    user.name = user.name;
    user.email = user.email;
    user.address = user.address;
    user.profession = user.profession;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      googleId:user.googleId,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      address: updatedUser.address,
      profession: updatedUser.profession,
      isCommitmentAdmin:user.isCommitmentAdmin,
      isTechAdmin:user.isTechAdmin,
      isCounselor:user.isCounselor,
      isAcademic:user.isAcademic,
      isTrainer:user.isTrainer,
      isCal: updatedUser.isCal,
      isReader: updatedUser.isReader,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// @desc    Get  user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    user.isCal = req.body.isCal;
    user.isReader = req.body.isReader;
    user.profession = req.body.profession || user.profession;
    user.isCommitmentAdmin=req.body.isCommitmentAdmin || user.isCommitmentAdmin;
    user.isTrainer=req.body.isTrainer || user.isTrainer;
    user.isTechAdmin=      req.body.isTechAdmin|| user.isTechAdmin;
    user.isCounselor=req.body.isCounselor||user.isCounselor;
    user.isAcademic=req.body.isAcademic||user.isAcademic;
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      googleId:user.googleId,
      isAdmin: updatedUser.isAdmin,
      isTrainer:user.isTrainer,
      isCommitmentAdmin:user.isCommitmentAdmin,
      isCal: updatedUser.isCal,
      isTechAdmin:user.isTechAdmin,
      isCounselor:user.isCounselor,
      isAcademic:user.isAcademic,
      isReader: updatedUser.isReader,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//get callipgraphers
//Private Admin /api/users/calligraphers

export const getCalligraphers = asyncHandler(async (req, res) => {
  const users = await User.find({ isCal: true }).select("-password");

  if (users) {
    res.status(201);
    res.json(users);
  } else {
    res.status(404);
    throw new Error("No calligraphers  found");
  }
});
//get readers
//Private Admin /api/users/readers

export const getReaders = asyncHandler(async (req, res) => {
  const users = await User.find({ isReader: true }).select("-password");

  if (users) {
    res.status(201);
    res.json(users);
  } else {
    res.status(404);
    throw new Error("No Readers found");
  }
});


export const checkGoogleId = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.params.mail }).select("-password");

  if (user) {
    if(user.googleId){
      res.status(201);
    res.json({social:true});  
    }
    res.status(201);
    res.json({social:false});
  } else {
    res.status(404);
    throw new Error("No no user found ");
  }
});