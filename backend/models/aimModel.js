import mongoose from "mongoose";


const aimSchema = mongoose.Schema(
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
    position: {
      type: String,
      required: true,
    },
    college:{
        type:String,
        required:true,
    },
    enquiry:{
        type:String,
        required:true,
    },
    isCompleted:{
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




const Aim = mongoose.model("Aim", aimSchema);

export default Aim;
