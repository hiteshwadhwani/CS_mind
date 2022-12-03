import mongoose from "mongoose";

const internSchema = mongoose.Schema(
  {
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    college:{
        type:String,
        required:true,
    },
    degree:{
        type:String,
        required:true,
    },
    project:{
        type:String,
        required:true,
    },
    sequence:{
      type:Number,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

const Intern = mongoose.model("Intern", internSchema);

export default Intern;