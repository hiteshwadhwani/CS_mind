import mongoose from "mongoose";


const counselSchema = mongoose.Schema(
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
    aboutYou: {
      type: String,
      required: true,
    },
    issues:{
        type:String,
        required:true,
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
      default:1
    }
  },
  {
    timestamps: true,
  }
);




const Counsel = mongoose.model("Counsel", counselSchema);

export default Counsel;
