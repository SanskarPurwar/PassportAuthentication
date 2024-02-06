import {asyncHandler} from '../utils/asyncHandler.js';

const registerUser = asyncHandler( async (req, res) => {
    // 1. collecting all input data,
    // 2. check all fields are filled
    // 3. check password and confirmPassword are same or not
    // 4. Check if this email is pre-registered or not
    // 5. save password
    // 6. assigning of tokens
    
    // 1.
    const {name , email , password , confirmPassword} = req.body;
    let errors = []
    if(!name || !email || !password || !confirmPassword){
        errors.push( {msg: 'Please fill in all fields'} );
        console.log(errors);
    }
    // if(password != confirmPassword){
    //     throw new console.error();
    // }
})


export {registerUser};