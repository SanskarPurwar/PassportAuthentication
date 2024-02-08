// const express = require('express');
import express from 'express'
const router = express.Router();
import passport from 'passport';
// User model
import { registerUser } from '../controller/user.controller.js';

// login
router.get('/login' , (req, res)=>{
    res.render(`login`)
})

// register
router.get('/register' , (req, res)=>{
    res.render('register')
})

router.post('/register' , registerUser)

router.post('/login' , (req,res,next)=>{
    passport.authenticate('local' ,{
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true 
    })(req,res,next);
});


export default router;
// module.exports = router;