const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connectDB');
require('dotenv').config()
const port = 5000;
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/newAuth");
const propertyRouter = require('./routes/propertyRoute');

const bookingRoutes = require('./routes/booking');


app.use(cookieParser())

app.use(express.json());
app.use(cors({origin:"https://65b21389b5f2a23c3abb5313--gentle-sprinkles-7fc787.netlify.app",credentials:true}))


app.use('/api', bookingRoutes);
app.use("/api/auth", userRouter);
app.use('/api', propertyRouter);

app.get("/api",(req,res)=>{
    res.send("Server is running");
})

app.listen(port,()=>{
    connectDB()
    console.log(`server is running on port ${port}`);
})