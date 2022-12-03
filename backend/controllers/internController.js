import Intern from "../models/internModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get particular intern
// private
export const getMyIntern = asyncHandler(async (req, res) => {
  const orders = await Intern.findOne({ _id: req.params.id });
  res.json(orders);
});

// @desc    Get all interns
//public             
export const getInterns = asyncHandler(async (req, res) => {
  const orders = await Intern.find({}).sort('sequence');
   
  res.json(orders);
});

// @desc    Create new intern 
// @route   POST /api/intern
// @access  Private
export const createIntern = asyncHandler(async (req, res) => {
  const { name,project,degree,college,image,sequence } = req.body;

  const order = new Intern({
    name,
    project,
    degree,
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

export const updateInternId=asyncHandler(async(req,res)=>{
  const aim=await Intern.findById(req.params.id)
  if(aim){
    aim.name=req.body.name || aim.name;
    aim.image=req.body.image || aim.image;
    aim.college=req.body.college || aim.college;
    aim.project =req.body.project || aim.project;
    aim.degree =req.body.degree || aim.degree;
    aim.sequence=req.body.sequence || aim.sequence;
    aim.image=req.body.image || aim.image;
    const updatedAim=await aim.save()
    res.json(updatedAim)
  }else{
    res.status(404)
      throw new Error('Intern  not found')
  }
})

export const deleteIntern=asyncHandler(async(req,res)=>{
    const aim=await Intern.findById(req.params.id)
    if(aim){
      
      await aim.remove()
      res.json({sucess:"sucessfully deleted"});
    }else{
      res.status(404)
        throw new Error('Intern  not found')
    }
  })