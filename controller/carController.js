const CarModel = require("../model/carModel");
const multer=require("multer");
const { v4: uuidv4 } = require('uuid');
const fs=require('fs');

const multerStorage=multer.diskStorage({
  destination:(req,file,cb)=>{
    console.log(file)
    cb(null,'ImageStore/')
  },
  filename:(req,file,cb)=>{
    console.log(file)
    const ext=file.mimetype.split('/')[1]
    cb(null,`user-${Date.now()}.${ext}`)
  }
})

const multerFilter=(res,file,cb)=>{
  if(file.mimetype.startsWith('image')){
    cb(null,true)
  }
  else{
    cb(res.status(400).json({
      status:"failure",
      message:"please upload only image"
    }))
  }
}

const upload=multer({
  storage:multerStorage,
  fileFilter:multerFilter
})

exports.UploadCarImage=upload.single('carImage');


exports.AddNewVehicle=async(req,res)=>{
  try{
    let carid=uuidv4();
    let doctorsLink= fs.readFileSync("ImageStore/" + req.file.filename)
    const files=req.file;
    let img64= Buffer.from(doctorsLink).toString('base64')
    const message4 =  "data:"+files.mimetype+";base64,"+img64;
    let carImage=message4;
    const data=await CarModel.create({...req.body,carImage})
            return res.status(200).json({
                status:"success"
            })
  }
  catch(err){
    console.log(err)
  }
}

exports.getAllVehicle = async (req, res) => {
  let query = CarModel.find();
  query = query.select("-__v");
  const carDetails = await query;
  res.status(200).json({
    status: "success",
    carDetails,
    result:carDetails.length
  });
};

exports.getVehicleById = async (req, res) => {
  try {
    const vehicleData = await CarModel.findById(req.params.id);
    return res.status(200).json({
      status: "succes",
      data: vehicleData,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getSearchTitle = async (req, res) => {
  const { search } = req.query;
  try {
    const VehicleFilter = await CarModel.find({
      title: { $regex: search, $options: "i" },
    });
    res.status(200).json({
      status: "success",
      data: VehicleFilter,
    });
  } catch (err) {
    console.log(err);
  }
};
