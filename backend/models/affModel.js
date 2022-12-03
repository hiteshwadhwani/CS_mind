import mongoose from "mongoose";

const affSchema = mongoose.Schema(
  {
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    info:{
        type:String,
        required:true,
    },
    words:{
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

const Aff = mongoose.model("Aff", affSchema);

export default Aff;