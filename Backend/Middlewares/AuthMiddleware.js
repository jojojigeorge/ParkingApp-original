import JWT from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";

// protected routes token base
export const requireSignIn = async (req, res, next) => {
  
  try {
    // console.log('-------------------test for authorization'.req.headers.authorization)
    if(req?.headers?.authorization){
      console.log('inside requireSignIn')
    const decode =JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    console.log('inside requireSignIn',decode)
    req.user=decode
    next();
    }else{
      console.log('no authorization data in req')
    }
    
  } catch (error) {
    console.log('error in requireSignIn middleware',error)
  }
};
export const isAdmin=async(req,res,next)=>{
    try {
      console.log('inside isAdmin')
      const user=await UserModel.findById(req.user._id)  
      if(user.role!==1){
        return res.status(401).send({
            success:false,
            message:"not an admin page"
        })
      }else{
        req.admin=true
        next()
      }
    } catch (error) {
        console.log(error)
    }
}
