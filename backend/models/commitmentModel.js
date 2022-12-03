import mongoose from "mongoose";


const commnetSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const commitmentSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
      },
    calligrapher:{
      type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        
    },
    reader:{
      type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    images:[String],    
    mobile: {
      type: Number,
      required: true,
    },
    aboutYou: {
      type: String,
      required: true,
    },
    dobtimeplace:{
        type:String,
        required:true,
    },
    aspirations:{
      type:String,
      required:true
    },
    family:{
      type:String,
      required:true
    },
    comments:[commnetSchema],
    variations:{
      type:String,
      required:true
    },
    isCompleted:{
      type:Boolean,
      default:false
    },
    isCompletedByCal:{
      type:Boolean,
      default:false
    },
    isCompletedByReader:{
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




const Commitment = mongoose.model("Commitment", commitmentSchema);

export default Commitment;
