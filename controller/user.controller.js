import {asyncHandler} from '../utils/asyncHandler.js';
import {User} from '../models/user.model.js';


const registerUser = asyncHandler( async (req,res)=> {
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
    }
            // 
    const user = await User.findOne({ email })
    if(user){
        errors.push({msg : "Email already exists"});
            res.render('register',{
                errors,
                name,
                email,
                password,
                confirmPassword
            })
    }
    const newUser = await User.create({
        fullName : name,
        email,
        password        
    });
    console.log(newUser);
    req.flash('success_msg' , 'You are registered successfully and can log in');
    res.redirect('/users/login');
    // res.send('dashboard.ejs')
})


export {registerUser};