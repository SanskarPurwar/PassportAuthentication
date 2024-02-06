// const express = require('express');
import express from 'express'
const router = express.Router();

router.get('/', (req , res)=>{
    res.render('welcome')
});

export default router;
// module.exports = router;