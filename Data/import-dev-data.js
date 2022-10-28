const dotenv=require('dotenv')
const fs=require('fs')
const mongoose=require('mongoose')
const Car=require('../model/carModel')
dotenv.config({path:'../config.env'})
console.log(process.env.DATABASE_PASSWORD)
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(con=>{
    console.log(con.connections)
    console.log("db successfully connected")
})

//read json file
const cars=JSON.parse(fs.readFileSync(`${__dirname}/Cars.json`,'utf-8'));

//import to db

const ImportData=async()=>{
    try{
        await Car.create(cars)
        console.log("data successfully loaded")
    }
    catch(err){
        console.log(err)
    }
    process.exit()
}

//delete previous data in db

const DeleteData=async()=>{
    try{
        await Car.deleteMany()
        console.log("deleted all data in db")
    }
    catch(err){
        console.log(err)
    }
    process.exit()
}

console.log(process.argv)
if(process.argv[2]==='--import'){
    ImportData()
}
else if(process.argv[2]==="--delete"){
    DeleteData()
}