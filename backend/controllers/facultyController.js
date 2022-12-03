import Faculty from "../models/facultyModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get particular faculty
// private
export const getMyFaculty = asyncHandler(async (req, res) => {
  const orders = await Faculty.findOne({ _id: req.params.id });
  res.json(orders);
});

// @desc    Get all faculty
//public             
export const getFaculties = asyncHandler(async (req, res) => {
  const orders = await Faculty.find({}).sort('sequence');
   
  res.json(orders);
});

// @desc    Create new faculty
// @route   POST /api/faculty
// @access  Private
export const createFaculty = asyncHandler(async (req, res) => {
  const { name,project,position,college,image,sequence } = req.body;

  const order = new Faculty({
    name,
    project,
    position,
    college,
    image,
    sequence
  });
  

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});



//@desc PUT update aim to complete
//@route PUT /api/aim/:id
//@access Private

export const updateFacultyId=asyncHandler(async(req,res)=>{
  const aim=await Faculty.findById(req.params.id)
  if(aim){
    aim.name=req.body.name || aim.name;
    aim.image=req.body.image || aim.image;
    aim.college=req.body.college || aim.college;
    aim.project =req.body.project || aim.project;
    aim.position =req.body.position || aim.position;
    aim.sequence=req.body.sequence || aim.sequence;
    aim.image=req.body.image || aim.image;
    const updatedAim=await aim.save()
    res.json(updatedAim)
  }else{
    res.status(404)
      throw new Error('Faculty  not found')
  }
})

export const deleteFaculty=asyncHandler(async(req,res)=>{
    const aim=await Faculty.findById(req.params.id)
    if(aim){
      
      await aim.remove()
      res.json({sucess:"sucessfully deleted"});
    }else{
      res.status(404)
        throw new Error('Faculty  not found')
    }
  })