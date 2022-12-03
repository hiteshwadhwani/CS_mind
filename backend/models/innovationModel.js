import mongoose from "mongoose";

const innovationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    projectname: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    professionDetails: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      receipt_email: { type: String },
    },
    price: {
      type: Number,
      default: 2,
    },
  },
  {
    timestamps: true,
  }
);

const Innovation = mongoose.model("Innovation", innovationSchema);

export default Innovation;
