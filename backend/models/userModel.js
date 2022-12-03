import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      
    },
    profession:{
      type:String,
      
    },
    address:{
      type:String,
    
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isCal:{
      type:Boolean,
      required:true,
      default:false
    },
    isReader:{
      type:Boolean,
      required:true,
      default:false
    },
    isCommitmentAdmin:{
      type:Boolean,
      required:true,
      default:false
    },
    isTrainer:{
      type:Boolean,
      required:true,
      default:false
    },
    isAcademic:{
      type:Boolean,
      required:true,
      default:false
    },
    isTechAdmin:{
      type:Boolean,
      required:true,
      default:false
    },
    isCounselor:{
      type:Boolean,
      required:true,
      default:false
    },
    googleId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    next()
  }
  const salt=await bcrypt.genSalt(10)
  this.password=await bcrypt.hash(this.password,salt)
})

const User = mongoose.model("User", userSchema);

export default User;
