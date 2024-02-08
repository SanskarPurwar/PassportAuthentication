// const express = require('express');
import express from 'express'
const router = express.Router();

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

export default router;
// module.exports = router;