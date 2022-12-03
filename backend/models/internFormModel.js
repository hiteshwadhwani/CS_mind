import mongoose from "mongoose";

const internFormSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
      },  
    mobile: {
      type: Number,
      required: true,
    },
    college:{
        type:String,
        required:true,
    },
    branch:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    degree:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true,
    },
    hod:{
        type:String,
        required:true,
    },
    intent:{
        type:String,
        required:true,
    },
    skills:{
        type:String,
        required:true,
    },
    project:{
        type:String,
        required:true,
    },
    
    isCompleted:{
      type:Boolean,
      default:false
    },
    
  },
  {
    timestamps: true,
  }
);




const InternForm = mongoose.model("InternForm", internFormSchema);

export default InternForm;
