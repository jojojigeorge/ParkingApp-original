import VehicleModel from "../Models/VehicleModel.js";

export const viewAllController=async(req,res)=>{
  try {
    // const allvehicle=await VehicleModel.find({}).sort({ createdAt: -1 })
    const allvehicle=await VehicleModel.find({user:req.user._id}).sort({ createdAt: -1 })
    res.status(200).send({ success: true, message: "get all vehicle ", allvehicle });
  } catch (error) {
    let er = "error in get all vehicle details";
    res.status(500).send({ success: false, message: er, error });
  }
}
// get single vehicle details
export const singleVehicleController=async(req,res)=>{
  try {
    const singlevehicle=await VehicleModel.findById(req.params.id)
    res.status(200).send({ success: true, message: "get single vehicle ", singlevehicle });
  } catch (error) {
    let er = "error in get single vehicle details";
    res.status(500).send({ success: false, message: er, error });
  }
}

export const editVehicleController = async (req, res) => {
  try {
    const { phone, owner_name, vehicle_no, address, user, paidfor } = req.body;
    
    let newProduct;
    if (paidfor>=1) {
      const { expirydate } = await VehicleModel.findById(req.params.id);

      console.log('current date and expirydate',new Date(),expirydate)
      console.log(new Date()< expirydate)
      if(new Date()<expirydate){
        newProduct = await VehicleModel.findByIdAndUpdate(req.params.id, { ...req.body, backlog:'', expirydate: +expirydate + paidfor * 24 * 60 * 60 * 1000 }, { new: true });
      }else{
        newProduct = await VehicleModel.findByIdAndUpdate(req.params.id, { ...req.body, backlog:'', expirydate: +new Date() + paidfor * 24 * 60 * 60 * 1000 }, { new: true });
      }
      await newProduct.save();
    } else {
      newProduct = await VehicleModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
      await newProduct.save();
    }
   
    res.status(200).send({ success: true, message: " vehicle updateted", newProduct });
  } catch (error) {
    let er = "error in update vehicle details";
    res.status(500).send({ success: false, message: er, error });
  }
};
export const deleteVehicleController=async(req,res)=>{
  try {
    const deletedvehicle=await VehicleModel.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: " vehicle deleted", deletedvehicle });
  } catch (error) {
    let er = "error in delete vehicle ";
    res.status(500).send({ success: false, message: er, error });
  }
}
const addVehicleController = async (req, res) => {
  try {
    const { phone, owner_name, vehicle_no, address, user, paidfor} = req.body;
    // exisiting user checking
    const existingVehicle = await VehicleModel.findOne({ vehicle_no: vehicle_no });
    if (existingVehicle) {
      return res.status(200).send({
        success: true,
        message: "Alredy registered please update",
      });
    }
    let newVechicle
    if(!paidfor){
     newVechicle = new VehicleModel({ ...req.body, user: req.user, expirydate: new Date() ,backlog:new Date()});

    }else{

       newVechicle = new VehicleModel({ ...req.body, user: req.user,backlog:'', expirydate: +new Date() + (paidfor) * 24 * 60 * 60 * 1000 });
    }
    await newVechicle.save();
    res.status(200).send({ success: true, message: "New vechicle added", newVechicle });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in creating new vechicle record", error });
  }
};
export default addVehicleController;
