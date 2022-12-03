import Aim from "../models/aimModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user orders
// @route               GET /api/aim/myaim
// @access  Private
export const getMyAimOrders = asyncHandler(async (req, res) => {
  const orders = await Aim.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
            // @route   GET /api/aim
// @access  Private/Admin
export const getAimOrders = asyncHandler(async (req, res) => {
  const orders = await Aim.find({}).populate("user", "id name");
  res.json(orders);
});

// @desc    Create new aim
// @route   POST /api/aim
// @access  Private
export const createAim = asyncHandler(async (req, res) => {
  const { mobile,position,college,enquiry,price } = req.body;

  const order = new Aim({
    user: req.user._id,
    mobile,
    position,
    college,
    enquiry,
    price
  });
  const paymentResult = {
    id: req.body.paymentid,
    status: req.body.status,
    receipt_email: req.body.receipt_email,
  };
  order.paymentResult=paymentResult;

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

// @desc    Get order by ID
// @route   GET /api/aim/:id
// @access  Private
export const getAimById = asyncHandler(async (req, res) => {
    const order = await Aim.findById(req.params.id).populate(
      'user',
      'name email'
    )
  
    if (order) {
      res.json(order)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })

//@desc PUT update aim to complete
//@route PUT /api/aim/:id
//@access Private

export const updateAimById=asyncHandler(async(req,res)=>{
  const aim=await Aim.findById(req.params.id).populate('user','name email')

  if(aim){
    aim.isCompleted=true
    const updatedAim=await aim.save()
    res.json(updatedAim)
  }else{
    res.status(404)
      throw new Error('Aim not found')
  }
})