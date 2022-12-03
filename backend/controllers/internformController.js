import InternForm from "../models/internFormModel.js";
import asyncHandler from "express-async-handler";


// export const getMyAimOrders = asyncHandler(async (req, res) => {
//   const orders = await Aim.find({ user: req.user._id });
//   res.json(orders);
// });

// @desc    Get all orders
            // @route   GET /api/internForm
// @access  Private/Admin
export const getInternOrders = asyncHandler(async (req, res) => {
  const orders = await InternForm.find({}).populate("user", "name email");
  res.json(orders);
});

// @desc    Create new internForm
// @route   POST /api/internForm
// @access  Private
export const createInternForm = asyncHandler(async (req, res) => {
  const { mobile,address,college,branch,degree,year,hod,intent,skills,project } = req.body;

  const order = new InternForm({
    user: req.user._id,
    mobile,
    address,
    branch,
    year,
    degree,
    hod,
    intent,
    skills,
    project,
    college,
    
  });


  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

// @desc    Get order by ID
// @route   GET /api/internForm/:id
// @access  Private
export const getInternFormById = asyncHandler(async (req, res) => {
    const order = await InternForm.findById(req.params.id).populate(
      'user',
      'name email'
    )
  
    if (order) {
      res.json(order)
    } else {
      res.status(404)
      throw new Error('Data not found')
    }
  })

//@desc PUT update aim to complete
//@route PUT /api/aim/:id
//@access Private

// export const updateAimById=asyncHandler(async(req,res)=>{
//   const aim=await Aim.findById(req.params.id).populate('user','name email')

//   if(aim){
//     aim.isCompleted=true
//     const updatedAim=await aim.save()
//     res.json(updatedAim)
//   }else{
//     res.status(404)
//       throw new Error('Aim not found')
//   }
// })