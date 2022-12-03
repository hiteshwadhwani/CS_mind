import Innovation from "../models/innovationModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user orders
// @route   GET /api/innovation/myinnovations
// @access  Private
export const getMyInnovationOrders = asyncHandler(async (req, res) => {
  const orders = await Innovation.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
            // @route   GET /api/innovation
// @access  Private/Admin
export const getInnovationOrders = asyncHandler(async (req, res) => {
  const orders = await Innovation.find({}).populate("user", "id name");
  res.json(orders);
});

// @desc    Create new innovation
// @route   POST /api/innovation
// @access  Private
export const createInnovation = asyncHandler(async (req, res) => {
  const { mobile, professionDetails, skills ,projectname,price} = req.body;
  const paymentResult = {
    id: req.body.paymentid,
    status: req.body.status,
    receipt_email: req.body.receipt_email,
  };

  const order = new Innovation({
    user: req.user._id,
    mobile,
    professionDetails,
    skills,
    paymentResult,
    isPaid:true,
    paidAt:Date.now(),
    projectname,
    price
  });
  

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getInnovationId = asyncHandler(async (req, res) => {
    const order = await Innovation.findById(req.params.id).populate(
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

  //@desc PUT update innov to complete
//@route PUT /api/innovation/:id
//@access Private admin

export const updateInnovationById=asyncHandler(async(req,res)=>{
  const innov=await Innovation.findById(req.params.id).populate('user','name email')

  if(innov){
    innov.isCompleted=true
    const updatedInnov=await innov.save()
    res.json(updatedInnov)
  }else{
    res.status(404)
      throw new Error('Aim not found')
  }
})