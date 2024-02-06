// require('dotenv').config({path: './env'})

import dotenv from "dotenv";
dotenv.config({path: './env'});
import express from 'express'
import connectDB from "./db/index.js";
import expressLayouts from "express-ejs-layouts";


const app = express();
app.use(expressLayouts);
app.set('view engine' , 'ejs');
app.use(express.urlencoded( {extended: false}))




//routes
import userrouter from './routes/user.js'
import homerouter from './routes/index.js'
app.use('/' , homerouter);
app.use('/users' ,  userrouter);


//connection done
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5500 , ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log(`MondoDB connection FAILED !!! ` , err);
})
