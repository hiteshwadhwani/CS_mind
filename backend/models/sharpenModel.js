import mongoose from "mongoose";




const sharpenSchema = mongoose.Schema(
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
    name:{
        type:String,
        required:true
    },
    qualification: {
      type: String,
      required: true,
    },
    experience:{
        type:String,
        required:true,
    },
    intended:{
      type:String,
      required:true
    },
    aboutYou:{
      type:String,
      required:true
    },
    
    isCompleted:{
      type:Boolean,
      default:false
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:{
      type:Date,
    },
    paymentResult:{
        id:{type:String},
        status:{type:String},
        receipt_email:{type:String}
    },
    price:{
      type:Number,
      default:2
    }
  },
  {
    timestamps: true,
  }
);




const Sharpen = mongoose.model("Sharpen", sharpenSchema);

export default Sharpen;
