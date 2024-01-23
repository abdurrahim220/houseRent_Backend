const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connectDB');
require('dotenv').config()
const port = 5000;

const authRouter = require("./routes/auth");
const propertyRouter = require('./routes/propertyRoute');

const cloudinaryModule = require('cloudinary');

const cloudinary = cloudinaryModule

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,

})

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cors())


// routes

app.use("/api/auth", authRouter);
app.use('/api', propertyRouter);

app.get("/api",(req,res)=>{
    res.send("Server is running");
})

app.listen(port,()=>{
    connectDB()
    console.log(`server is running on port ${port}`);
})