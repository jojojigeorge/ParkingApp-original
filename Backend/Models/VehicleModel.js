import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    
    vehicle_no: {
      type: String,
      required: true,
      unique:true,
      trim: true,
    },
    paidfor:{
        type:Number,
        default:0
    },
    user: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    owner: {
      type: String,
    },
    expirydate: {
      type: Date,
    //   default: +new Date() + 7*24*60*60*1000
    },
    backlog:{
      type:Date,
      default:''
    }
    
  },
  { timestamps: true }
);

export default mongoose.model("vehicles", vehicleSchema);
