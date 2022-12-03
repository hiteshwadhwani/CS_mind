import mongoose from "mongoose";

const facultySchema = mongoose.Schema(
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
    position:{
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

const Faculty = mongoose.model("Faculty", facultySchema);

export default Faculty;