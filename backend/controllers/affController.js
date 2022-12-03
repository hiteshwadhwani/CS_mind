import Aff from "../models/affModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get particular intern
// private
export const getMyAff = asyncHandler(async (req, res) => {
  const orders = await Aff.findOne({ _id: req.params.id });
  res.json(orders);
});

// @desc    Get all interns
//public             
export const getAffs = asyncHandler(async (req, res) => {
  const orders = await Aff.find({}).sort('sequence');
   
  res.json(orders);
});

// @desc    Create new intern 
// @route   POST /api/intern
// @access  Private
export const createAff = asyncHandler(async (req, res) => {
  const { name,info,words,image,sequence } = req.body;

  const order = new Aff({
    name,
    info,
    words,
    image,
    sequence
  });
  

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});



//@desc PUT update aim to complete
//@route PUT /api/aim/:id
//@access Private

export const updateAffId=asyncHandler(async(req,res)=>{
  const aim=await Aff.findById(req.params.id)
  if(aim){
    aim.name=req.body.name || aim.name;
    aim.image=req.body.image || aim.image;
    aim.info=req.body.info || aim.info;
    aim.words =req.body.words || aim.words;
    aim.sequence=req.body.sequence || aim.sequence;
    aim.image=req.body.image || aim.image;
    const updatedAim=await aim.save()
    res.json(updatedAim)
  }else{
    res.status(404)
      throw new Error('Affiliate  not found')
  }
})

export const deleteAff=asyncHandler(async(req,res)=>{
    const aim=await Aff.findById(req.params.id)
    if(aim){
      
      await aim.remove()
      res.json({sucess:"sucessfully deleted"});
    }else{
      res.status(404)
        throw new Error('Aff  not found')
    }
  })