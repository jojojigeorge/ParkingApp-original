import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../Helpers/BycryptPassword.js";
import UserModels from "../Models/UserModel.js";
import VehicleModel from "../Models/VehicleModel.js";
import UserModel from "../Models/UserModel.js";

// fetch all user order
// export const userOrderController=async(req,res)=>{
//   try {
//     // console.log(process.env.RAZOR_PAY_SECRET)

//     const userorder=await orderModel.find({buyer:req.user._id}).populate("products", "-photo").populate('buyer',"name")
//     // res.json(userorder)
//     res.status(200).send({success:true,message:'fetched all user order',userorder})
//   } catch (error) {
//     res.status(500).send({success:true,message:'fetched all user order',error})
//   }
// }

// fetch all  order in admin
// export const allOrderController=async(req,res)=>{
//   try {
//     // console.log(process.env.RAZOR_PAY_SECRET)
//     const allorder=await orderModel.find().populate("products", "-photo").populate('buyer',"name").sort({createdAt:-1})
//     // res.json(userorder)
//     res.status(200).send({success:true,message:'fetched all  order',allorder})
//   } catch (error) {
//     res.status(500).send({success:true,message:'fetched all  order',error})
//   }
// }

// update order status in admin
// export const updateOrderstatusController=async(req,res)=>{
//   try {
//     const {orderId}=req.params
//     const {status}=req.body
//     const updatedorder=await orderModel.findByIdAndUpdate(orderId,{status:status},{ new: true })
//     res.status(200).send({success:true,message:'successfully updated order status',updatedorder})
//   } catch (error) {
//     res.status(500).send({success:false,message:'error in updating order status'})
//   }
// }

// get all vehicle details in admin dashboard
export const viewAllVehicleAdminController = async (req, res) => {
  try {
    const allvehicle = await VehicleModel.find({}).populate("user").sort({ updatedAt: -1 });
    res.status(200).send({ success: true, message: "get all vehicle ", allvehicle });
  } catch (error) {
    let er = "error in get all vehicle details";
    res.status(500).send({ success: false, message: er, error });
  }
};
// tody collection
export const todaycollectionController = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);

    let allvehicle;
    if (req.admin) {
      allvehicle = await VehicleModel.find({
        updatedAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      })
        .populate("user")
        .sort({ updatedAt: -1 });
    } else {
      allvehicle = await VehicleModel.find({
        $and: [
          { user: req.user._id },
          {
            updatedAt: {
              $gte: startOfDay,
              $lte: endOfDay,
            },
          },
        ],
      })
        .populate("user")
        .sort({ updatedAt: -1 });
    }
    let planone = 0;
    let planseven = 0;
    let planmonth = 0;
    let plannotpaid = 0;

    allvehicle.forEach((vehicle) => {
      if (vehicle.paidfor === 1) {
        planone = planone + 1;
      } else if (vehicle.paidfor === 7) {
        planseven = planseven + 1;
      } else if (vehicle.paidfor === 30) {
        planmonth = planmonth + 1;
      } else if (vehicle.paidfor === 0) {
        plannotpaid = plannotpaid + 1;
      } else {
      }
    });
    let total = 10 * planone + 50 * planseven + 200 * planmonth;
    let todaycollection = {
      total: total,
      planone: planone,
      planseven: planseven,
      planmonth: planmonth,
      plannotpaid: plannotpaid,
    };

    res.status(200).send({ success: true, message: "get all vehicle ", allvehicle, todaycollection });
  } catch (error) {
    let er = "error in get today vehicle details";
    res.status(500).send({ success: false, message: er, error });
  }
};
const registerController = async (req, res) => {
  try {
    const { name, email, phone, password, address, question } = req.body;
    // validation
    if (!name || !email || !phone || !password || !address) {
      return res.send({ error: "fill the required field" });
    }
    const existingUser = await UserModels.findOne({ email: email });
    // exisiting user checking
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Alredy registered please login",
      });
    }
    // register new user
    const hashedPassword = await hashPassword(password);
    const user = await new UserModels({ name, email, phone, address, password: hashedPassword, question }).save();
    res.status(201).send({
      success: true,
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};
export default registerController;

// update user details
export const updateUserDetailsController = async (req, res) => {
  try {
    // const {name,phone,password,address}=req.body.userdata
    const { name, phone, password, address } = req.body;

    let hashedPassword = "";
    const existingUser = await UserModels.findById(req.user._id);
    // if(password&&password.length<6){
    //   return res.json({error:"password is required and 6 character long"})
    // }
    if (password) {
      hashedPassword = await hashPassword(password);
    }
    const updateduser = await UserModels.findByIdAndUpdate(
      req.user._id,
      {
        name: name || existingUser.name,
        phone: phone || existingUser.phone,
        address: address || existingUser.address,
        password: hashedPassword || existingUser.password,
      },
      {
        new: true,
      }
    );
    res.status(200).send({
      success: true,
      message: "user updated successfully",
      updateduser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update user",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await UserModels.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "invalid password",
      });
    } else {
      // create token
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.status(200).send({
        success: true,
        message: "login success",
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

// // // test controller for testing
// // export const testController = (req, res) => {
// //   res.send("protected routes");
// // };

// forgotpassword controller
export const forgotPasswordController=async(req,res)=>{
  try {
    const {email,newpassword,question}=req.body
    if(!email||!newpassword||!question){
      res.status(404).send({success:false,message:'please complete the field'})
    }
    const user=await UserModel.findOne({email,question})
    if(!user){
      res.status(404).send({ success:false,message:'invalid recovery question'})
    }else{
      const hash=await hashPassword(newpassword)
      await UserModel.findByIdAndUpdate(user._id,{password:hash})
      res.status(200).send({success:true,message:"password updated",user})
    }
  } catch (error) {
      console.log(error)
      res.status(500).send({success:false,message:'something wrong in forgot password',error})
  }
}
