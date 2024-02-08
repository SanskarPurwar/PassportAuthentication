// require('dotenv').config({path: './env'})

import dotenv from "dotenv";
dotenv.config({path: './env'});
import express from 'express'
import connectDB from "./db/index.js";
import expressLayouts from "express-ejs-layouts";
import session from 'express-session';
import flash from 'connect-flash';

import passport from 'passport';
import initializePassport from './config/passport.js';

initializePassport(passport);

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


const app = express();
app.use(expressLayouts);
app.set('view engine' , 'ejs');


// bodyparser
app.use(express.urlencoded( {extended: false}))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized : true,
})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use( (req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


//routes
import userrouter from './routes/user.js'
import homerouter from './routes/index.js'
app.use('/' , homerouter);
app.use('/users' ,  userrouter);


