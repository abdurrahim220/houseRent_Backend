const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connectDB');
require('dotenv').config()
const port = 5000;
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/newAuth");
const propertyRouter = require('./routes/propertyRoute');



app.use(cookieParser())

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.use("/api/auth", userRouter);
app.use('/api', propertyRouter);

app.get("/api",(req,res)=>{
    res.send("Server is running");
})

app.listen(port,()=>{
    connectDB()
    console.log(`server is running on port ${port}`);
})