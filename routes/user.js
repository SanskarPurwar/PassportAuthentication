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
export default router;
// module.exports = router;
