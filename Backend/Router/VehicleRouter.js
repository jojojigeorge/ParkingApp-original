import express from 'express'
import { requireSignIn } from '../Middlewares/AuthMiddleware.js'
import addVehicleController, { deleteVehicleController, editVehicleController, singleVehicleController, viewAllController } from '../Controller/VehicleController.js'
// import addVehicleController from '../Controller/VehicleController.js'

const router=express.Router()
// add vechicle 
router.post('/add-vehicle',requireSignIn,addVehicleController)

// delete vechicle
router.delete('/delete/:id',requireSignIn,deleteVehicleController)


// edit vehicle status
router.put('/edit-vehicle/:id',requireSignIn,editVehicleController)

// edit vehicle all details
router.put('/editall-vehicle/:id',requireSignIn,editVehicleController)

// view all vehicle
router.get('/view-all',requireSignIn,viewAllController)

// single vehicle details
router.get('/single-vehicle/:id',requireSignIn,singleVehicleController)
export default router