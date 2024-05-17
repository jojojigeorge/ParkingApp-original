import express from 'express'
import registerController, { forgotPasswordController, loginController, todaycollectionController, updateUserDetailsController, viewAllVehicleAdminController } from '../Controller/UserControllers.js';
import { isAdmin, requireSignIn } from '../Middlewares/AuthMiddleware.js';

const router=express.Router()

router.get('/', (req, res)=>{ 
    res.status(200); 
    res.send("Welcome to router"); 
});
// routing for register user
router.post('/register',registerController)

// routing for login user
router.post('/login',loginController)

// forgot password
router.post('/forgot-password',forgotPasswordController)

// protected routes user
router.get('/user-auth',requireSignIn,(req,res)=>{res.status(200).send({ok:true})})

// protected routes admin role
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{res.status(200).send({ok:true})})

// view all vehicle in admin dashboard
router.get('/admin-allvehicle',requireSignIn,isAdmin,viewAllVehicleAdminController)

// view today collection details in admin
router.get('/admin-todaycollection',requireSignIn,isAdmin,todaycollectionController)

// view today collection details in user
router.get('/user-todaycollection',requireSignIn,todaycollectionController)

// update user details 
router.put("/profile",requireSignIn,updateUserDetailsController)

// // forgot password
// router.post('/forgot-password',forgotPasswordController)
export default router