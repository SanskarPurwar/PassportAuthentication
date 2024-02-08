// const express = require('express');
import express from 'express'
const router = express.Router();

// login
router.get('/login' , (req, res)=>{
    res.render(`login`)
})

// register
router.get('/register' , (req, res)=>{
    res.render('register')
})


router.post('/register' , (req,res)=> {
    const {name , email , password , confirmPassword} = req.body;
    let errors = []
    console.log(name, email, password , confirmPassword);

    if(!name || !email || !password || !confirmPassword){
        errors.push( {msg: 'Please fill in all fields'} );
        console.log(errors);
    }

    if(password !== confirmPassword){
        errors.push({msg : 'Passwords do not match'});
        console.log(errors);
    }

    if(password.length < 6){
        errors.push({msg: "Password should have atleast 6 character"})
        console.log(errors);
    }

    if(errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    }else{
        res.send("pass");
    }

})

export default router;
// module.exports = router;