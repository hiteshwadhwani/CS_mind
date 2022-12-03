import asyncHandler from "express-async-handler";
import Commitment from "../models/commitmentModel.js";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import { google } from "googleapis";

// @desc    Create new paid commitment
// @route   POST /api/commitment
// @access  Private
export const addCommitment = asyncHandler(async (req, res) => {
  const {
    mobile,
    aboutYou,
    dobtimeplace,
    aspirations,
    family,
    variations,
    price,
  } = req.body;

  const paymentResult = {
    id: req.body.paymentid,
    status: req.body.status,
    receipt_email: req.body.receipt_email,
  };

  const commitment = new Commitment({
    mobile,
    aboutYou,
    dobtimeplace,
    aspirations,
    family,
    variations,
    paymentResult,
    user: req.user._id,
    isPaid: true,
    paidAt: Date.now(),
    price,
  });

  const createdCommitment = await commitment.save();

  res.status(201).json(createdCommitment);
});

// @desc    Get commitment by ID
// @route   GET /api/commitment/:id
// @access  Private
export const getCommitmentById = asyncHandler(async (req, res) => {
  const order = await Commitment.findById(req.params.id)
    .populate("user", "name email")
    .populate("reader", "name email")
    .populate("calligrapher", "name email");

  if (order) {
    res.status(200);
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Commitment not found");
  }
});
// @desc    Update counsel to  completed
// @route   PUT /api/counsel/:id
// @access  Private/Admin
export const updateCommitmentlToComplete = asyncHandler(async (req, res) => {
  const counsel = await Commitment.findById(req.params.id)
    .populate("user", "name email")
    .populate("reader", "name email")
    .populate("calligrapher", "name email");

  if (counsel) {
    counsel.isCompleted = true;

    const updatedCounsel = await counsel.save();

    res.json(updatedCounsel);
  } else {
    res.status(404);
    throw new Error("Commitment order not found");
  }
});

// @desc    Update commitment to assigned
// @route   PUT /api/commitment/cal/:id
// @access  Private/Admin
export const updateCommitmentCal = asyncHandler(async (req, res) => {
  console.log("uodate commitment cal route");
  const commitment = await Commitment.findById(req.body.id);
  console.log(commitment);

  if (commitment) {
    const cal = await User.findById(req.body.calid);
    console.log(cal);
    if (cal) {
      if (cal.isCal) {
        commitment.calligrapher = cal._id;
        const updatedCommitment = await commitment.save();
        res.status(201);
        res.json(updatedCommitment);
      } else {
        res.status(401);
        throw new Error("user is not a caligrapher");
      }
    }
  } else {
    res.status(404);
    throw new Error("commitment not found");
  }
});

// @desc    Update commitment to assigned
// @route   PUT /api/commitment/reader/:id
// @access  Private/Admin
export const updateCommitmentReader = asyncHandler(async (req, res) => {
  const commitment = await Commitment.findById(req.body.id);

  if (commitment) {
    const reader = await User.findById(req.body.readerid);
    if (reader) {
      if (reader.isReader) {
        commitment.reader = reader._id;
        const updatedCommitmentReader = await commitment.save();
        res.status(201);
        res.json(updatedCommitmentReader);
      } else {
        res.status(401);
        throw new Error("user is not a reader");
      }
    } else {
      res.status(404);
      throw new Error("reader not found");
    }
  } else {
    res.status(404);
    throw new Error("reader not found");
  }
});

// @desc    Get logged in user   commitment orders
// @route   GET /api/counsel/mycounsels
// @access  Private
export const getMyCommitments = asyncHandler(async (req, res) => {
  const orders = await Commitment.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all commitment orders
// @route   GET /api/counsel
// @access  Private/Admin
export const getCommitments = asyncHandler(async (req, res) => {
  const counsels = await Commitment.find({})
    .populate("user", "id name email")
    .populate("reader", "name email")
    .populate("callipgrapher", "name email");
  res.json(counsels);
});

// @desc    Get all commitment assigned to calligrapher
// @route   GET /api/cal/:id
// @access  Private/Calligraher
export const getCalCommitments = asyncHandler(async (req, res) => {
  const counsels = await Commitment.find({ calligrapher: req.params.id })
    .populate("user", "id name email")
    .populate("reader", "name email")
    .populate("callipgrapher", "name email");

  res.json(counsels);
});

// @desc    Get all commitment assigned to reader
// @route   GET /api/reader/:id
// @access  Private/Reader
export const getReaderCommitments = asyncHandler(async (req, res) => {
  const counsels = await Commitment.find({ reader: req.params.id })
    .populate("user", "id name email")
    .populate("reader", "name email")
    .populate("callipgrapher", "name email");
  res.json(counsels);
});

//@desc update commitmet images uploaded by calligrapher
//@route PUT /api/commitment/:id
//@access Private/Cal
// @desc    Get all commitment assigned to reader
// @route   GET /api/reader/:id
// @access  Private/Reader
export const updateCalUploads = asyncHandler(async (req, res) => {
  console.log({ id: req.body.id });

  const commitment = await Commitment.findById(req.body.id)
    .populate("user", "id name email")
    .populate("reader", "name email")
    .populate("callipgrapher", "name email");

  const calid = req.body.calid;
  console.log({ calid: calid });
  let images = [
    req.body.image1,
    req.body.image2,
    req.body.image3,
    req.body.image4,
    req.body.image5,
  ];
  console.log({ length: images.length });
  if (commitment && images.length == 5) {
    console.log("length kam kr rgi h");
    if (commitment.calligrapher._id == calid) {
      console.log("calid match");
      (commitment.images = images), (commitment.isCompletedByCal = true);
      const updatedCommitment = await commitment.save();
      res.status(201);
      res.json(updatedCommitment);
    } else {
      res.status(401);
      throw new Error("not authorized");
    }
  } else {
    res.status(400);
    throw new Error("no commitment found");
  }
});

//@desc update commitmet images selected by reader
//@route PUT /api/reader/select
//@access Private/Reader

export const updateReaderUploads = asyncHandler(async (req, res) => {
  const commitment = await Commitment.findById(req.body.id)
    .populate("user", "id name email")
    .populate("reader", "name email")
    .populate("callipgrapher", "name email");

  const readerid = req.body.readerid;

  const images = req.body.images;
  if (images.length < 3) {
    res.status(500);
    throw new Error("select at least three");
  }

  if (commitment && images.length < 6) {
    if (commitment.reader._id == readerid) {
      (commitment.images = images), (commitment.isCompletedByReader = true);
      const updatedCommitment = await commitment.save();
      if (updatedCommitment) {
        /*  const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI)
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

        let info = await transporter.sendMail({
          from: "hsolanki1884@gmail.com", // sender address
          to: updatedCommitment.user.email, // list of receivers
          subject: "CSMIND COMMITMENT", // Subject line
          text: `Your signature images has been uploaded, check it out on your dashboard `, // plain text body
        });
        if (info) {
          res.status(200);
          res.json({
            message: "email has been sent to your user",
            info,
          });
        } else {
          res.status(500);
          throw new Error("server error could not send your reset mail");
        }
      }
    } else {
      res.status(401);
      throw new Error("not authorized");
    }
  } else {
    res.status(400);
    throw new Error("no commitment found");
  }
});

// @desd add comment to the schema
// @route POST /api/commitment/comment
// @ Private user

export const addComment = asyncHandler(async (req, res) => {
  console.log("in add comment");
  const commitment = await Commitment.findById(req.body.id)
    .populate("user", "id name email")
    .populate("reader", "name email")
    .populate("callipgrapher", "name email");
  console.log("in add found comment");
  const { comment } = req.body;
  if (commitment) {
    const newComment = {
      name: req.user.name,
      comment: comment,
      user: req.user._id,
    };
    commitment.comments.push(newComment);
    await commitment.save();

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
     */ const mailoptions = [
      commitment.reader.email,
      commitment.calligrapher.email,
    ];

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
    let info = await transporter.sendMail({
      from: "hsolanki1884@gmail.com", // sender address
      to: mailoptions, // list of receivers
      subject: "CSMIND COMMITMENT NEW FEEDBACk", // Subject line
      text: `New feedback is aaded in commitment id: ${commitment._id} `, // plain text body
    });
    res.status(200);
    res.json(newComment);
  } else {
    res.status(404);
    throw new Error("commitment not found");
  }
});
