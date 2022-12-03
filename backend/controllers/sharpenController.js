import Sharpen from "../models/sharpenModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user orders
// @route   GET /api/sharpen/mysharpen
// @access  Private
export const getMySharpenOrders = asyncHandler(async (req, res) => {
  const orders = await Sharpen.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/sharpen
// @access  Private/Admin
export const getSharpenOrders = asyncHandler(async (req, res) => {
  const orders = await Sharpen.find({}).populate("user", "id name");
  res.json(orders);
});

// @desc    Create new  sharpen
// @route   POST /api/sharpen
// @access  Private
export const createSharpen = asyncHandler(async (req, res) => {
  const {
    mobile,
    qualification,
    name,
    experience,
    intended,
    aboutYou,
    price
  } = req.body;

  const order = new Sharpen({
    user: req.user._id,
    mobile,
    aboutYou,
    experience,
    qualification,
    intended,
    name,
    price,
  });
  const paymentResult = {
    id: req.body.paymentid,
    status: req.body.status,
    receipt_email: req.body.receipt_email,
  };
  order.paymentResult = paymentResult;
   console.log(order)
  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

// @desc    Get order by ID
// @route   GET /api/aim/:id
// @access  Private
export const getSharpenById = asyncHandler(async (req, res) => {
  const order = await Sharpen.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc PUT update aim to complete
//@route PUT /api/aim/:id
//@access Private

export const updateSharpenById = asyncHandler(async (req, res) => {
  const aim = await Sharpen.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (aim) {
    aim.isCompleted = true;
    const updatedAim = await aim.save();
    res.json(updatedAim);
  } else {
    res.status(404);
    throw new Error("Aim not found");
  }
});
