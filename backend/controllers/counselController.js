import asyncHandler from 'express-async-handler'
import Counsel from '../models/counselModel.js'

// @desc    Create new paid counsel
// @route   POST /api/counsel
// @access  Private
export const addCounsel = asyncHandler(async (req, res) => {
  const {
    mobile,aboutYou,issues,price
  } = req.body

  const paymentResult={
      id:req.body.paymentid,
      status:req.body.status,
      receipt_email:req.body.receipt_email  
  }

   
    const counsel = new Counsel({
      mobile,
      aboutYou,
      issues,
      paymentResult,
      user: req.user._id,
      isPaid:true,
      paidAt:Date.now(),
      price
      
    })

    const createdOrder = await counsel.save()

    res.status(201).json(createdOrder)
  
})

// @desc    Get counsel by ID
// @route   GET /api/counsel/:id
// @access  Private
export const getCounselById = asyncHandler(async (req, res) => {
  const order = await Counsel.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Counsel not found')
  }
})



// @desc    Update counsel to  completed 
// @route   PUT /api/counsel/:id
// @access  Private/Admin
export const updateCounselToComplete = asyncHandler(async (req, res) => {
  const counsel = await Counsel.findById(req.params.id).populate('user','name email')

  if (counsel) {
    counsel.isCompleted = true
    

    const updatedCounsel = await counsel.save()

    res.json(updatedCounsel)
  } else {
    res.status(404)
    throw new Error('Counselling order not found')
  }
})

// @desc    Get logged in user   counsel orders
// @route   GET /api/counsel/mycounsels
// @access  Private
export const getMyCounsels = asyncHandler(async (req, res) => {
  const orders = await Counsel.find({ user: req.user._id });
  res.json(orders);
});


// @desc    Get all counsels
// @route   GET /api/counsel
// @access  Private/Admin
export const getCounsels = asyncHandler(async (req, res) => {
  const counsels = await Counsel.find({}).populate('user', 'id name email')
  res.json(counsels)
})

