import express from 'express'
import passport from 'passport';

const router = express.Router();
import { registerUser } from '../controller/user.controller.js';

import { forwardAuthenticated} from '../config/auth.js'

// login
router.get('/login' ,forwardAuthenticated, (req, res)=>{
    res.render(`login`)
})

// register
router.get('/register' ,forwardAuthenticated, (req, res)=>{
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

router.get('/logout' , (req , res)=>{
    req.logout( (error) => {
        if(error){
            return next(error)
        } 
    });
    req.flash('success_msg', 'logged out successfully');
    res.redirect('/users/login');
});  

export default router;
// module.exports = router;