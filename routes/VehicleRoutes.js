const express=require("express");
const {getAllVehicle,getVehicleById,getSearchTitle,AddNewVehicle,UploadCarImage}=require("../controller/carController");

const router=express.Router();

router.route("/AddNewVehicle").post(UploadCarImage,AddNewVehicle);
router.route("/getallVehicle").get(getAllVehicle)
router.route("/getVehicleById/:id").get(getVehicleById)
router.route("/getSearchTitle").get(getSearchTitle)
module.exports=router;