// const express = require('express');
import express from 'express'
const router = express.Router();
import {ensureAuthenticated , forwardAuthenticated} from '../config/auth.js'


router.get('/',forwardAuthenticated, (req , res)=>{
    res.render('welcome')
});

router.get('/dashboard' , ensureAuthenticated, (req, res)=>{
    res.render('dashboard')
})

export default router;
// module.exports = router;