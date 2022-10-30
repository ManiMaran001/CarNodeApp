const express=require("express");
const app=express();
const cors=require("cors");
const vehicleRoutes=require("./routes/VehicleRoutes");
const corsOptions ={
    origin:'https://razocab.vercel.app/', 
    credentials:true,          
    optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/v1',vehicleRoutes);
module.exports=app;
